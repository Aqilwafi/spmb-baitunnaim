# Database Design

> **Status:** 🚧 Work in Progress
> Database schema, PostgreSQL functions, and security policies are actively evolving and may change as the application grows.

## Overview

This repository contains the complete database design for the **Website LPI Baitunnaim** ecosystem built on **Supabase (PostgreSQL)**.

The database is shared across multiple applications within the monorepo:

* **Website** — Public website, company profile, articles, and publications.
* **SPMB** — Student admission and registration system.
* **Admin Panel** — Internal management for users, CMS, publications, and SPMB.

Besides table definitions, this repository also contains:

* PostgreSQL Functions
* Row Level Security (RLS) Policies
* Views
* Database Indexes
* Supporting Documentation

---

# Design Principles

The database is designed with the following principles:

* Security First
* Data Consistency
* Scalability
* Maintainability
* Domain-Oriented Design
* Supabase Friendly

---

# Business Domains

The database is organized into several logical modules.

## Authority

Responsible for authentication, user identity, and authorization.

Examples:

* Profiles
* User Roles
* Role Domains

---

## Master Data

Reference data shared across the entire system.

Examples:

* Domains
* Institutions (Lembaga)
* Academic Years
* Registration Steps
* Roles
* Document Types
* Categories

---

## Student Admission (SPMB)

Handles the complete admission workflow.

Examples:

* Registration Forms
* Student Biodata
* Family Information
* Previous Education
* Uploaded Documents
* Payments

---

## Publications

Stores public content published on the website.

Examples:

* Posts
* Tags
* Categories
* Post Relationships

---

## CMS

Manages website content outside of publications.

Examples:

* Pages
* Hero Banners
* FAQ
* Testimonials
* Partners
* Social Media
* Site Settings

---

## System

Provides infrastructure for monitoring and auditing.

Examples:

* Audit Trail
* Activity Logs

---

# High-Level Architecture

```text
auth.users
      │
      ▼
 profiles
      │
      ▼
 user_roles
      │
      ▼
─────────────────────────────────────
 Business Modules
─────────────────────────────────────

Authority
Master Data
CMS
Publications
SPMB
System
```

---

# Repository Structure

```text
database_design/
│
├── schema/
│   ├── tables/
│   └── other/
│
├── functions/
│
├── policies/
│
├── views/
│
├── docs/
│
├── matrix.md
├── roles.md
└── README.md
```

---

# Deployment Order

Database objects should generally be deployed in the following order:

```text
1. Extensions
2. Custom Types / Enums
3. Tables
4. Indexes & Constraints
5. Functions
6. Views
7. Row Level Security Policies
8. Seed / Initial Data
```

---

# Documentation

Additional documentation is organized separately to keep this README concise.

| Document                    | Description                                     |
| --------------------------- | ----------------------------------------------- |
| `docs/architecture.md`      | Overall database architecture and relationships |
| `docs/modules.md`           | Detailed explanation of each business module    |
| `docs/design-philosophy.md` | filosofi design                                 |
| `docs/security.md`          | RLS, RBAC, helper functions, and security model |
| `docs/deployment.md`        | Deployment order and initialization process     |
| `docs/conventions.md`       | Naming conventions and development guidelines   |
| `docs/soft-delete.md`       | Soft delete strategy and implementation         |
| `docs/roles.md`             | Role definitions                                |
| `docs/matrix.md`            | Permission matrix                               |

---

# Future Roadmap

Planned improvements include:

* Permission-driven RBAC
* Approval Workflow
* Notification Engine
* Background Jobs
* Data Archival Strategy
* Reporting & Analytics
* Payment Gateway Integration