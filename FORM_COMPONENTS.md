# Global Form Components for React Final Form

This project now includes reusable form components that integrate with `react-final-form` and Zod validation.

## Components

### 1. InputField

A text input field with automatic validation error display.

**Props:**

- `name` (required): Field name for react-final-form
- `label` (required): Label text to display
- `placeholder` (optional): Placeholder text
- `type` (optional): Input type (default: "text")
- `required` (optional): Show required asterisk (default: true)

**Example:**

```tsx
<InputField
  name="case_number"
  label="رقم القضية"
  placeholder="أدخل رقم القضية"
/>

<InputField
  name="supply_date"
  label="تاريخ الورود"
  type="date"
/>

<InputField
  name="other_party"
  label="طرف آخر"
  placeholder="أدخل اسم الطرف الاخر"
  required={false}
/>
```

### 2. SelectField

A dropdown select field with automatic validation error display.

**Props:**

- `name` (required): Field name for react-final-form
- `label` (required): Label text to display
- `placeholder` (optional): Placeholder text (default: "اختر...")
- `required` (optional): Show required asterisk (default: true)
- `children` (required): SelectItem components

**Example:**

```tsx
<SelectField name="case_type" label="نوع القضية" placeholder="اختر نوع القضية">
  {CASE_TYPES?.map((caseType) => (
    <SelectItem key={caseType.id} value={caseType.value}>
      {caseType.name}
    </SelectItem>
  ))}
</SelectField>
```

## Features

✅ **Automatic validation**: Errors from Zod schema are automatically displayed
✅ **Touch tracking**: Errors only show after field is touched
✅ **Consistent styling**: All fields follow the same design pattern
✅ **Required indicators**: Automatic asterisk for required fields
✅ **Type safety**: Full TypeScript support
✅ **Reusable**: Use anywhere in your application

## Usage in Forms

These components must be used inside a `<Form>` component from react-final-form:

```tsx
<Form onSubmit={handleSubmit} validate={validateFunction}>
  {({ handleSubmit }) => (
    <form onSubmit={handleSubmit}>
      <InputField name="field1" label="Field 1" />
      <SelectField name="field2" label="Field 2">
        <SelectItem value="option1">Option 1</SelectItem>
      </SelectField>
      <button type="submit">Submit</button>
    </form>
  )}
</Form>
```

## File Locations

- `src/components/ui/InputField.tsx` - Input field component
- `src/components/ui/SelectField.tsx` - Select field component
