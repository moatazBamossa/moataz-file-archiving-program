# File Archiving Program

A complete React web application for managing file archives (cases) built with React, TypeScript, Vite, Supabase, TailwindCSS, and shadcn/ui.

## Features

- 🔐 **Authentication**: Email/password authentication using Supabase Auth
- 📊 **Dashboard**: Overview with statistics, latest cases, and quick actions
- 📁 **Case Management**: Create, view, edit, and delete cases
- 🔍 **Advanced Search**: Search cases with multiple filters and export to CSV
- 👥 **User Management**: Manage users and assign roles (admin only)
- 🎨 **Modern UI**: Beautiful, responsive design with dark/light mode
- 📱 **Mobile Responsive**: Works seamlessly on all devices

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Backend**: Supabase (Database + Auth)
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **Form Handling**: React Hook Form + Zod
- **Routing**: React Router

## Prerequisites

- Node.js 18+ and npm
- A Supabase account and project (optional for initial testing)

## Setup Instructions

> **Note**: Supabase is currently commented out to allow the app to run without backend setup. The app will work with mock data. To enable Supabase, uncomment the code in `src/lib/supabase.ts`, `src/hooks/useAuth.ts`, and `src/store/authStore.ts`.

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. Set up your Supabase database tables:

Run the following SQL in your Supabase SQL editor:

```sql
-- Topics table
CREATE TABLE topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Objectives table
CREATE TABLE objectives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Judges table
CREATE TABLE judges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cases table
CREATE TABLE cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_number TEXT NOT NULL,
  supply_date DATE NOT NULL,
  case_type TEXT NOT NULL,
  case_type_title TEXT,
  prosecutor TEXT,
  defendant TEXT,
  topic_id UUID REFERENCES topics(id),
  objective_id UUID REFERENCES objectives(id),
  judge_id UUID REFERENCES judges(id),
  history_of_ruling TEXT,
  judgment_date DATE,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- App Users table
CREATE TABLE app_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  auth_user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Roles table
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Roles junction table
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your security requirements)
-- For now, we'll allow authenticated users to read/write
CREATE POLICY "Allow authenticated users to read cases" ON cases
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert cases" ON cases
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update cases" ON cases
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete cases" ON cases
  FOR DELETE USING (auth.role() = 'authenticated');

-- Similar policies for other tables
CREATE POLICY "Allow authenticated users to read app_users" ON app_users
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage app_users" ON app_users
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read roles" ON roles
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read user_roles" ON user_roles
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage user_roles" ON user_roles
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert default admin role
INSERT INTO roles (name, description) VALUES ('admin', 'Administrator with full access');
```

3. Enable Email/Password authentication in Supabase:
   - Go to Authentication > Providers
   - Enable Email provider

### 3. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
  components/        # Reusable UI components
    layout/         # Layout components (Sidebar, TopNav, etc.)
    ui/             # shadcn/ui components
  features/         # Feature-specific components (if needed)
  hooks/            # Custom React hooks
    useAuth.ts      # Authentication hook
    useCases.ts     # Case management hooks
    useUsers.ts     # User management hooks
    ...
  lib/              # Utility functions and configurations
    supabase.ts     # Supabase client
    utils.ts        # Utility functions
  pages/            # Page components
    Dashboard.tsx
    Login.tsx
    AddCase.tsx
    ...
  store/            # Zustand stores
    authStore.ts    # Authentication state
    themeStore.ts   # Theme state
  types/            # TypeScript type definitions
    index.ts
  App.tsx           # Main app component with routing
  main.tsx          # Entry point
  index.css         # Global styles
```

## Usage

1. **Login**: Use your Supabase email/password credentials
2. **Dashboard**: View statistics and latest cases
3. **Add Case**: Create new archive cases with all required information
4. **All Cases**: View, edit, and delete cases in a table format
5. **Search**: Use advanced filters to find specific cases and export to CSV
6. **Users**: Manage users and assign roles (admin only)
7. **Settings**: Toggle between light and dark mode

## Environment Variables

Create a `.env` file with:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## License

MIT

