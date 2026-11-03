# Components Coding Conventions

This document describes conventions for writing, reviewing, or modifying UI components in this project.

## Client components

Chakra UI components are client components. Keep Chakra UI imports inside `"use client"` files rather than importing them directly from server components. Put Chakra UI in a sibling client component when a server page needs to stay server-side.

## Imports

Import Chakra UI components from component subpaths, not from the package root:

```tsx
import { useState } from "react";
import NextLink from "next/link";
import { Box } from "@chakra-ui/react/box";
import { Flex } from "@chakra-ui/react/flex";
import { HStack, VStack } from "@chakra-ui/react/stack";
import { Heading } from "@chakra-ui/react/heading";
import { Text } from "@chakra-ui/react/text";
import { Link } from "@chakra-ui/react/link";
import { Field } from "@chakra-ui/react/field";
import { Input } from "@chakra-ui/react/input";
import { Checkbox } from "@chakra-ui/react/checkbox";
import { Button } from "@chakra-ui/react/button";
import { Icon } from "@chakra-ui/react/icon";
import { Icon as Iconify } from "@iconify/react";
```

Order imports in these groups:

1. **React**: `react`, `react-dom`.
2. **Next.js**: `next/link`, `next/font/google`, and other `next/*` modules.
3. **Chakra UI**, ordered internally by component type:
   1. **Layout components**: `Box`, `Flex`, `HStack`, `VStack`, `Grid`, `Container`, and similar.
   2. **Primitives**: `Heading`, `Text`, `Link`, `Image`, and similar. Order as heading, text, link.
   3. **Form components**: `Field` first, then inputs (`Input`, `Checkbox`, and similar), then `Button` last.
   4. **Others**: `Accordion`, `Badge`, `Menu`, `SkipNav*`, and similar.
4. **Icons**: Chakra UI `Icon`, then Iconify's `Icon`.
5. **Workspace and local aliases**: `@lib/*`, `@components/*`, `@betterbayombong/*`.

- Put all type-only imports next to the imports they belong to.
- The package root is allowed only for provider and system setup, such as `ChakraProvider` and `defaultSystem`. Never import components from it.
- Do not add blank lines between import groups.
- Alias Iconify's `Icon` as `Iconify` so Chakra UI's `Icon` can keep its name.
- Otherwise use the component name directly and alias only when two imports collide, such as `Link` and `NextLink`.
- Use the Chakra UI `Icon` component as the wrapper and Iconify for the icon data.

```tsx
<Icon boxSize={8}>
  <Iconify icon="lucide:layers" />
</Icon>;
```

## File structure

Order sections in a component file as follows:

1. **Imports**
2. **Types and interfaces** (before any constants or helpers that use them)
3. **Constants and variables** (`const` and `let`)
4. **Functions and helpers**
5. **Components**

Put types and interfaces first when constants or helper functions in the file are shaped by them, so readers learn the shape before the values. A constant that does not use a type from the file, such as a font configuration, may come before the type section.

Within the type section:

- Put one-line union types before interfaces.
- Order interfaces by importance: the primary types first, then the types they depend on. For example, `NavLinkEntry` and `NavMenuEntry` come before `NavColumn` and `NavLeaf`.
- Put component props interfaces last.

Within the constants section, put the data the component is built around first and secondary constants after it. For example, navigation entries come before the language menu options.

## Component structure

Declare every component's props in a dedicated interface named `<ComponentName>Props`. Do not inline the props type in the function signature, and do not use a type alias for props. This applies to the main component and to every helper component in the same file.

```tsx
interface ExampleProps {
  items: string[];
}

interface ExampleItemProps {
  item: string;
}
```

Within the components section, define the exported main component first so readers see the file's purpose immediately. Order the remaining components by walking its render tree depth-first:

- A subcomponent follows the component that first renders it.
- Child components follow their parent immediately.
- Shared components used across the file go last.

Always declare components with a plain function declaration, not as an arrow function assigned to a `const`.

```tsx
export function Example({ items }: ExampleProps) {
  return (
    <Box>
      {items.map(item => <ExampleItem key={item} item={item} />)}
    </Box>
  );
}

function ExampleItem({ item }: ExampleItemProps) {
  return <Link href="#">{item}</Link>;
}
```

## Standard components

Prefer the standard Chakra UI component when one exists, and use the styled factory (`chakra.*`) only when no component fits:

```tsx
// Good
<Button variant="ghost" ...>

// Avoid
<chakra.button ...>
```

Avoid thin wrapper components that only forward props or apply styles to a single element. Use the Chakra component directly, including when it needs Next.js navigation:

```tsx
<Link as={NextLink} href={href}>
  {label}
</Link>;
```

## Stacks

Use `HStack` and `VStack` only. Do not use the generic `Stack`.

`VStack` defaults to `align="center"`. When children must fill the width, pass `align="stretch"` explicitly:

```tsx
<VStack align="stretch" gap={4}>
  <Field.Root required>...</Field.Root>
  <Field.Root required>...</Field.Root>
</VStack>;
```

A `css` prop does not reliably override `VStack`'s default alignment, so use the `align` prop instead.

## Prop ordering

Put semantic/component props first and styling props last.

Semantic/component props include:

- `as`, `type`, `href`, `name`, `autoComplete`, `autoFocus`, `required`, `defaultChecked`.
- `icon` for Iconify.
- On form controls, put identity/required props first: `name`, then `type` for inputs, then state props such as `required` and `defaultChecked`.
- `size` is a combined style prop, so treat it as styling and keep it after semantic props.

### Accessibility props

Accessibility props come after the other semantic/component props and immediately before styling props. They are the last non-style group.

- `aria-*` props (for example `aria-label`, `aria-hidden`, `aria-live`).
- Accessibility labels and translations supplied through a component prop, such as `translations` on `Marquee.Root`.

```tsx
<Marquee.Root
  autoFill
  pauseOnInteraction
  translations={{ root: "Media carousel" }}
  speed={80}
  spacing="12px"
/>

<Link href="/settings" aria-label="Open settings" color="fg.muted" fontSize="sm">
  Settings
</Link>;
```

Example:

```tsx
<Input
  name="email"
  type="email"
  autoComplete="email"
  autoFocus
  size="md"
/>

<Link href="/recover" color="fg.muted" fontSize="sm">
  Forgot password?
</Link>

<Button type="submit" width="full" size="md">
  Sign in
</Button>
```

### Style prop order

Order style props using the CSS-Tricks "grouped by type" convention:

1. **Positioning**: `position`, `zIndex`, `top`, `right`, `bottom`, `left`.
2. **Display and box model**: `display`, `overflow`, `boxSizing`, `flex`, `align`, `justify`, `gap`, `w`, `h`, `maxW`, `minH`, `px`, `py`, `borderWidth`, `mx`, `my`, `ml`, `mr`.
3. **Color**: `bg`, `color`, `borderColor`.
4. **Text**: `fontSize`, `lineHeight`, `letterSpacing`, `textAlign`.
5. **Other**: `transition`, `cursor`, animations.

Notes:

- Widths come before min/max widths; padding comes before border; border comes before margin.
- `overflow` and `boxSizing` come with the box model, right after `display`.
- Combined styles like `size` go after individual style props in the same area.
- Semantic tokens are preferred: `bg="bg"`, `color="fg.muted"`, `borderColor="border"`.
- Use numeric spacing tokens where possible: `gap={4}`, `px={6}`, `py={{ base: 6, md: 12 }}`, `zIndex={1}`, `boxSize={8}`.

Examples:

```tsx
<Box w="full" maxW="sm" mx={{ base: "auto", md: 0 }} />

<HStack
  position="relative"
  zIndex={1}
  gap={3}
  py={{ base: 4, md: 8 }}
  ml={{ base: 0, md: -4 }}
  bg="bg"
/>

<Flex
  as="section"
  align="center"
  flex={{ md: 2 }}
  justify="center"
  px={{ base: 6, md: 12 }}
  py={{ base: 10, md: 16 }}
  borderRightWidth={{ base: 0, md: "1px" }}
  borderColor="border"
/>
```

### State and pseudo styles

Put state and pseudo styles last, after all regular style props. This covers `_hover`, `_focus`, `_focusVisible`, `_active`, `_disabled`, `_invalid`, `_placeholder`, and similar.

- Order state objects by the order a user usually reaches them: `_hover`, then `_focus`/`_focusVisible`, then `_active`, then `_disabled`.
- Styles inside a state object still follow the normal style prop ordering: positioning, display and box model, color, text, other.

```tsx
<Link
  href="#"
  display="inline-flex"
  alignItems="center"
  gap={1}
  px={2.5}
  py={1}
  rounded="full"
  bg="whiteAlpha.200"
  color="white"
  textDecoration="none"
  _hover={{ bg: "whiteAlpha.300" }}
  _focusVisible={{ outlineWidth: "2px", outlineColor: "white" }}
>
  Example link
</Link>;
```

## Control flow

Always use braces for `if` statements, including single-line bodies:

```tsx
// Good
if (isOpen) {
  return;
}

// Avoid
if (isOpen) return;
```

## JSX formatting

### No blank lines between siblings

Do not put blank lines between sibling JSX elements:

```tsx
// Good
<VStack align="stretch" gap={6}>
  <Field.Root required>...</Field.Root>
  <Field.Root required>...</Field.Root>
  <Button type="submit" width="full" size="md">
    Sign in
  </Button>
</VStack>

// Avoid
<VStack align="stretch" gap={6}>
  <Field.Root required>...</Field.Root>

  <Field.Root required>...</Field.Root>

  <Button type="submit" width="full" size="md">
    Sign in
  </Button>
</VStack>
```

### Line breaks

- By default, components with **4 or more props** break onto one prop per line.
- Up to **5 props** may stay inline when every prop name is short, every value is a short literal (a brief string or a plain number), and the tag still reads compactly. If the line feels long, break it.
- Always break with **6 or more props**, or when a value is a computed expression, object, callback, or long string.
- Layout components (`Box`, `Flex`, `HStack`, `VStack`) follow the same rules.
- Text components (`Heading`, `Text`, `Link`, `Button`) always put their text content on its own line when they have **2 or more props**.
- Break object style values onto one property per line when they have **3 or more properties**.

```tsx
// Few props: inline
<Box w="full" maxW="sm" mx={{ base: "auto", md: 0 }} />

// 5 short props: still compact enough to stay inline
<Flex h="full" align="center" justify="space-between" gap={2} />

// 4+ props, or longer names and expressions: one per line
<Input
  name="email"
  type="email"
  autoComplete="email"
  autoFocus
  size="md"
/>

// 3+ properties in a style object: one per line
_focusVisible={{
  outline: "2px solid",
  outlineColor: "gray.400",
  outlineOffset: "2px",
}}

// Text content on its own line when the component has 2+ props
<Heading as="h1" size="2xl">
  Sign in
</Heading>

<Text color="fg.muted" fontSize="sm">
  Please sign in your account to continue
</Text>

<Button type="submit" width="full" size="md">
  Sign in
</Button>
```

Do not use `defineStyle`/`css` for ordinary layout styling. Keep styles as Chakra UI props unless there is a clear, repeated reason to extract them.

## Forms

Use `Field.Root` and the `Field` namespace for labels, help text, and validation:

```tsx
<Field.Root required>
  <Field.Label>Email</Field.Label>
  <Input
    name="email"
    type="email"
    autoComplete="email"
    autoFocus
    size="md"
  />
</Field.Root>;
```

Use `Checkbox.Root` with its parts:

```tsx
<Checkbox.Root name="rememberMe" defaultChecked>
  <Checkbox.HiddenInput />
  <Checkbox.Control />
  <Checkbox.Label>Remember me</Checkbox.Label>
</Checkbox.Root>;
```

Use full-width submit buttons:

```tsx
<Button type="submit" width="full" size="md">
  Sign in
</Button>;
```

## Accessibility

- Every `Input` must have a `Field.Label`.
- Decorative icons need `aria-hidden="true"` or must be wrapped in an icon component that sets it.
- Icon-only buttons need an `aria-label`.
- Use semantic heading levels (`h1` for the page title, then `h2`, etc.).
- Prefer semantic tokens for contrast-safe colors.
- Place accessibility props such as `aria-*` and accessibility labels right before styling props, as described in [Prop ordering](#prop-ordering).

## Verification

Before finishing a component change, run the project's formatter check and typecheck/lint commands using its configured package manager. If the project exposes a combined check script, run that too.

For visual checks, start the project's dev server and verify both desktop and mobile layouts. If the component is reached through client-side navigation, verify the navigation itself, not only a direct page load.

Always stop the dev server after verification. Do not leave it running in the background once the checks are done.
