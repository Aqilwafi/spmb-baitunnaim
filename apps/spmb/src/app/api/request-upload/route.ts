// app/api/request-upload/route.ts

import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@bn/supabase'
import { requestUploadMetadataSchema } from '@bn/validators'

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServer()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validation = requestUploadMetadataSchema.safeParse(body)
    console.log('request-upload validation:', validation)
    console.log('request-upload body:', body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || 'Bad Request' },
        { status: 400 }
      )
    }

    const { fileName } = validation.data
    const filePath = `bukti-pembayaran/${user.id}/${Date.now()}-${fileName}`

    const { data, error: storageError } = await supabase.storage
      .from('SPMB')
      .createSignedUploadUrl(filePath)

    if (storageError) {
      console.error('createSignedUploadUrl error:', storageError)
      return NextResponse.json({ error: storageError.message }, { status: 500 })
    }

    return NextResponse.json({
      signedUrl: data.signedUrl,
      path: data.path,
      token: data.token,
    })
  } catch (err) {
    console.error('upload-tokens route error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}