# Components Coding Style

This document describes conventions for writing, reviewing, or modifying UI components in this project.

## Client components

Chakra UI components are client components. Keep Chakra UI imports inside `"use client"` files rather than importing them directly from server components. Put Chakra UI in a sibling client component when a server page needs to stay server-side.

## Imports

Import Chakra UI from component subpaths, not from the package root:

```tsx
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

1. **Layout components**: `Box`, `Flex`, `HStack`, `VStack`, `Grid`, `Container`, and similar.
2. **Primitives**: `Heading`, `Text`, `Link`, `Image`, and similar. Order as heading, text, link.
3. **Form components**: `Field` first, then inputs (`Input`, `Checkbox`, and similar), then `Button` last.
4. **Others**: Chakra UI `Icon`, Iconify, utilities.

- Do not add blank lines between import groups.
- Alias Iconify's `Icon` as `Iconify` so Chakra UI's `Icon` can keep its name.
- Use the Chakra UI `Icon` component as the wrapper and Iconify for the icon data.

```tsx
<Icon boxSize={8}>
  <Iconify icon="lucide:layers" width="100%" height="100%" />
</Icon>;
```

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

Define the main component first in the file, so the exported component is at the top and readers see the file's purpose immediately. Helper components, subcomponents, and local utilities go below it.

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
2. **Display and box model**: `display`, `flex`, `align`, `justify`, `gap`, `w`, `h`, `maxW`, `minH`, `px`, `py`, `borderWidth`, `mx`, `my`, `ml`, `mr`.
3. **Color**: `bg`, `color`, `borderColor`.
4. **Text**: `fontSize`, `lineHeight`, `letterSpacing`, `textAlign`.
5. **Other**: `transition`, `cursor`, animations.

Notes:

- Widths come before min/max widths; padding comes before border; border comes before margin.
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

- Components with **4–5 or more props** break onto one prop per line.
- Components with **fewer props** stay inline.
- Layout components (`Box`, `Flex`, `HStack`, `VStack`) only break when they have many props or the line becomes too long.
- Text components (`Heading`, `Text`, `Link`, `Button`) always put their text content on its own line when they have **2 or more props**.

```tsx
// Few props: inline
<Box w="full" maxW="sm" mx={{ base: "auto", md: 0 }} />

// 4–5+ props: one per line
<Input
  name="email"
  type="email"
  autoComplete="email"
  autoFocus
  size="md"
/>

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
