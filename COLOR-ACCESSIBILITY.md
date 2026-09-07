# LCARS Color and Accessibility Log

## Scope

This is the approved LCARS palette. Each hexadecimal value is used exactly as
provided; no colors were lightened, darkened, or otherwise replaced. The
accessibility work changes which approved color is assigned to each VS Code
role so text remains readable on the dark-blue and dark-gray surfaces.

## Accessibility role changes

| Role | Previous approved color | New approved color | Reason |
| --- | --- | --- | --- |
| Tag and attribute tokens | True mauve `#C082A9` | African violet `#BAA4E5` | On dark blue, true mauve measured 3.84:1 and failed normal-text AA. African violet measures 5.22:1. |
| Error and invalid-token text | Mars `#FF2200` | Pale orange-red `#FF977B` | Mars red provides only 3.00:1 on dark blue, suitable for a graphical error marker but not normal text. Pale orange-red is readable as diagnostic text. |
| Deleted-resource text | Mars `#FF2200` | Pale orange-red `#FF977B` | Keeps deleted file names readable in source control decorations. |
| Terminal red text | Red `#CF4F4F` and light orange-red `#FF6753` | Pale orange-red `#FF977B` | The previous terminal reds are too dark for normal-size terminal text on dark blue. |
| Terminal blue text | Medium dark blue `#2A7193` | Bright blue `#41C4F7` | Bright blue gives stronger terminal-text contrast. |
| Terminal magenta text | True mauve `#C082A9` | African violet `#BAA4E5` | African violet meets normal-text AA on dark blue; true mauve does not. |
| Secondary-button text | True mauve `#C082A9` | African violet `#BAA4E5` | Dark-blue labels on true mauve measured 3.84:1. African violet raises that to 5.22:1, meeting normal-text AA. |
| Diff line fills | Blue `#37A6D1` and orange-red `#E7442A` | Matching border colors | Replaces colored text backgrounds with borders, preserving readable inherited diff text. |
| Function and method tokens | Barley `#EDB378` | African violet `#BAA4E5` | Reduces the concentration of warm orange tones in code while retaining AA contrast. |
| Type and class tokens | African violet `#BAA4E5` | Barley `#EDB378` | Keeps barley in the syntax palette on the less frequent type roles, balancing warm and cool token colors. |
| HTML/XML tag names | African violet `#BAA4E5` | Bright blue `#41C4F7` | Separates document structure from attributes and preserves a 5.73:1 contrast ratio on the editor background. |
| HTML/XML attribute names | African violet `#BAA4E5` | Barley `#EDB378` | Gives attributes a distinct warm accent without using the same color as tag names. |
| HTML/XML tag punctuation | African violet `#BAA4E5` | Ghost gray `#D2D5DF` | Keeps angle brackets and closing syntax visually quiet so names and values remain easier to scan. |
| HTML/XML attribute names | Barley `#EDB378` | African violet `#BAA4E5` | Removes the concentration of warm tones in Angular bindings while preserving a 5.22:1 contrast ratio on the editor background. |
| HTML/XML attribute values | Almond creme `#FCC19F` | Ghost gray `#D2D5DF` | Separates literal values from names and bindings, reducing warm visual weight in template-heavy files. |
| HTML/XML attribute values | Ghost gray `#D2D5DF` | Almond creme `#FCC19F` | Restores a visible value accent after the neutral assignment made Angular templates too monochrome; attribute names remain African violet. |

Mars red `#FF2200`, butterscotch `#EA9C72`, light orange-red `#FF6753`, and
orange-red `#E7442A` remain in the theme as non-text diagnostic colors:
editor squiggles, overview-ruler/gutter markers, and diff borders. Diagnostic
messages use text and icons in addition to color. Red `#CF4F4F` is retained
only as a decorative unfocused-tab accent because it does not meet the 3:1
non-text contrast threshold on dark blue.

VS Code exposes one shared `button.secondary*` color set. Notification actions
such as **Always** and **Never** therefore remain the same visual class; their
distinct text labels and position provide the differentiation. A color theme
cannot assign an individual color to either action.

## Contrast targets

| Foreground | Background | Contrast | Result |
| --- | --- | ---: | --- |
| Starlight `#F3F4F7` | Dark blue `#1C3C55` | 10.45:1 | AAA |
| Starlight `#F3F4F7` | Dark gray `#2F3749` | 10.83:1 | AAA |
| Starlight `#F3F4F7` | Medium dark gray `#52596E` | 6.34:1 | AA |
| Dark blue `#1C3C55` | African violet `#BAA4E5` | 5.22:1 | AA |
| Dark blue `#1C3C55` | Bright blue `#41C4F7` | 5.73:1 | AA |
| Barley `#EDB378` | Dark gray `#2F3749` | 6.42:1 | AA |

## Approved palette and usage

| Color | Hex | Current usage |
| --- | --- | --- |
| African violet | `#BAA4E5` | Active selections, suggestion selections, secondary buttons, function/method tokens, HTML/XML attribute names, terminal magenta. |
| Almond | `#D29B7F` | Terminal green and untracked Git decorations. |
| Almond creme | `#FCC19F` | Hovered primary and secondary buttons, active line numbers, HTML/XML attribute values, string tokens, bright terminal green. |
| Barley | `#EDB378` | Activity-bar icons, sidebar and panel headings, type/class tokens, bright terminal yellow. |
| Bluey | `#8899FF` | Word-highlight overview-ruler marker. |
| Brown | `#895129` | Bracket-match background. |
| Butterscotch | `#EA9C72` | Modified Git decorations and warning squiggle. |
| Dirty mauve | `#7A506D` | Find-match overview-ruler marker. |
| Dusty mauve | `#9D698A` | Selection-highlight overview-ruler marker. |
| Lilac | `#8A72A7` | Strong word-highlight overview-ruler marker and hint squiggle. |
| Mars | `#FF2200` | Error squiggle and error indicator only; never normal text. |
| Orange | `#EB943A` | Active links, panel and status borders, active-tab stripe, and terminal yellow. |
| Red | `#CF4F4F` | Decorative unfocused active-tab accent only; never text or a state indicator. |
| Subdued sienna | `#C47D69` | Modified overview-ruler marker. |
| True mauve | `#C082A9` | Badge backgrounds with dark-blue foreground text. |
| Blue | `#37A6D1` | Informational squiggle and inserted-diff border. |
| Bright blue | `#41C4F7` | Focus rings, links, input/widget borders, primary buttons, keywords/storage tokens, HTML/XML tag names, terminal blue, and terminal cyan. |
| Dark blue | `#1C3C55` | Editor, terminal, title-bar, panel, inactive-tab, and primary-button foreground backgrounds. |
| Dark gray | `#2F3749` | Sidebar, status bar, widgets, inputs, dropdowns, and line-highlight backgrounds. |
| Ghost gray | `#D2D5DF` | Secondary text, inactive labels, HTML/XML tag punctuation, terminal white, and inactive tabs. |
| Light gray | `#9EA5BA` | Comments, placeholders, and inactive line numbers. |
| Light orange-red | `#FF6753` | Added-line gutter indicator only; never normal text. |
| Medium dark blue | `#2A7193` | Minimap background. |
| Medium dark gray | `#52596E` | Active tabs, hover states, section headers, inactive selections, and indent guides. |
| Orange-red | `#E7442A` | Deleted-line gutter and removed-diff border. |
| Pale orange-red | `#FF977B` | Error text, invalid tokens, deleted-resource text, editor cursor, headings, and terminal red. |
| Primary gray | `#6D748C` | Whitespace markers and bright terminal black. |
| Starlight | `#F3F4F7` | Main editor, sidebar, widget, terminal, tab, title-bar, and status-bar text. |
