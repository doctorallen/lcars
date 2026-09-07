# LCARS Color and Accessibility Log

## Scope

This is the approved LCARS palette. Each RGB color is used exactly as provided;
where VS Code supports alpha, opacity is used only to soften an overlay without
introducing a new base hue. No colors were lightened, darkened, or otherwise
replaced. The accessibility work changes which approved color is assigned to
each VS Code role so text remains readable on the dark-blue and dark-gray
surfaces.

## Marketplace tokenization reference

On 2026-09-07, the token organization was compared with the ten highest-install
actual color/syntax themes in the VS Code Marketplace. Install counts are a
snapshot from the public [Marketplace extension query API](https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery)
and can change over time. The raw Marketplace `Themes` category also ranks
icon-only extensions and one non-theme package, so those entries were excluded
from the tokenization sample.

| Rank | Theme | Marketplace installs | Official theme source |
| ---: | --- | ---: | --- |
| 1 | [C/C++ Themes](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools-themes) | 59,151,469 | [Microsoft/vscode-cpptools](https://github.com/microsoft/vscode-cpptools/blob/c31cb2a399af4af7d92c0e88cbda791e2898bcf9/Themes/themes/cpptools_dark_vs_new.json) |
| 2 | [PowerShell](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell) | 21,483,403 | [PowerShell/vscode-powershell](https://github.com/PowerShell/vscode-powershell/blob/9c5933866b74051f0312d4239584522893736c87/themes/theme-psise/theme.json) |
| 3 | [GitHub Theme](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme) | 20,002,705 | [primer/github-vscode-theme](https://github.com/primer/github-vscode-theme/blob/cd78e5e4e7bcf132a6f428ae0f32264bb1b729cf/src/theme.js) |
| 4 | [One Dark Pro](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme) | 12,701,527 | [Binaryify/OneDark-Pro](https://github.com/Binaryify/OneDark-Pro/blob/54c3280b29f2c2ed9751e5ca4e071380b7b42205/themes/OneDark-Pro.json) |
| 5 | [Dracula Theme Official](https://marketplace.visualstudio.com/items?itemName=dracula-theme.theme-dracula) | 10,908,466 | [dracula/visual-studio-code](https://github.com/dracula/visual-studio-code/blob/1b9ecf4d7e0c8cc2e2e890a7a41ad1db5fff1e6c/src/dracula.yml) |
| 6 | [Atom One Dark](https://marketplace.visualstudio.com/items?itemName=akamud.vscode-theme-onedark) | 7,323,105 | [akamud/vscode-theme-onedark](https://github.com/akamud/vscode-theme-onedark/blob/a8be970644982221f9b61fb1c4b3da74b4beab79/themes/OneDark.json) |
| 7 | [Material Theme](https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme) | 4,281,535 | [vira-themes/vira-theme-support](https://github.com/vira-themes/vira-theme-support) |
| 8 | [Ayu](https://marketplace.visualstudio.com/items?itemName=teabyii.ayu) | 4,192,558 | [ayu-theme/vscode-ayu](https://github.com/ayu-theme/vscode-ayu/blob/444ef92911cb75c3933c8003e3a7c79b6b6c914f/ayu-dark.json) |
| 9 | [Monokai Pro](https://marketplace.visualstudio.com/items?itemName=monokai.theme-monokai-pro-vscode) | 4,140,431 | [monokai.pro](https://monokai.pro) and the packaged `Monokai Pro.json` theme |
| 10 | [Winter is Coming](https://marketplace.visualstudio.com/items?itemName=johnpapa.winteriscoming) | 3,734,274 | [johnpapa/vscode-winteriscoming](https://github.com/johnpapa/vscode-winteriscoming/blob/260547834cb6ac37dd5b8bb5842cc1c8d3164946/themes/WinterIsComing-dark-blue-color-theme.json) |

All ten use variants of the following TextMate families:

| Token family | Common TextMate/semantic scopes |
| --- | --- |
| Keywords and operators | `keyword`, `keyword.control`, `keyword.operator`, `punctuation.definition.keyword` |
| Storage and modifiers | `storage`, `storage.type`, `storage.modifier` |
| Classes and types | `entity.name.type`, `entity.name.class`, `entity.other.inherited-class`, `support.type` |
| Functions and methods | `entity.name.function`, `variable.function`, `support.function`, `meta.method-call` |
| Parameters and properties | `variable.parameter`, `variable.other.property`, `variable.other.object.property`, `meta.property-name` |
| Variables and constants | `variable`, `variable.language`, `variable.other.constant`, `constant.numeric`, `constant.language` |
| Support/library symbols | `support.function`, `support.type`, `support.class`, `support.constant`, `support.variable` |
| Decorators and annotations | `meta.decorator`, `entity.name.function.decorator`, `support.token.decorator` |
| Markup and structure | `markup.*`, `punctuation.*`, `meta.*`, `entity.name.tag`, `entity.other.attribute-name` |
| Diagnostics | `invalid`, `invalid.illegal`, `invalid.deprecated` |

The strongest differences are implementation choices rather than different
fundamental taxonomies:

- C/C++ Themes, PowerShell, GitHub Theme, and Winter is Coming favor broad
  family rules with targeted language selectors.
- One Dark Pro, Dracula, Atom One Dark, Material Theme, Ayu, and Monokai Pro
  add more language-qualified rules for JavaScript/TypeScript, PHP, Python,
  Rust, Java, CSS, markup, and embedded syntaxes.
- Ayu and One Dark Pro provide the most useful semantic distinctions, including
  `class`, `interface`, `struct`, `enumMember`, `function`, `method`, `macro`,
  `variable.constant`, and `variable.defaultLibrary`.
- No sampled theme injects a grammar to split individual TypeScript modifier
  words. Theme files consume scopes produced by language grammars; grammar
  injections belong in language extensions.

LCARS already follows the common taxonomy and has a broader semantic map than
most of the sample ([`tokenColors`](https://github.com/doctorallen/lcars/blob/main/themes/LCARS-color-theme.json#L132-L452),
[`semanticTokenColors`](https://github.com/doctorallen/lcars/blob/main/themes/LCARS-color-theme.json#L452-L484)).
The top-ten comparison supports targeted alias and semantic-token refinements,
not a replacement of the current palette or taxonomy.

The resulting refinement adds canonical `constant.character.escape` and
`constant.regexp` coverage, recognizes `invalid.deprecated`, and maps semantic
`variable.constant` and `method.defaultLibrary` tokens to the existing barley
accent. No new colors or grammar injections were added.

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
| Keyword, operator, storage, and storage-type tokens | Shared bright blue `#41C4F7` | African violet `#BAA4E5`, bright blue `#41C4F7`, and pale orange-red `#FF977B` | Follows the common Marketplace taxonomy without importing its colors: language keywords, operators, modifiers, and declaration types have independent roles. |
| TypeScript/JavaScript class names | Barley `#EDB378` | Ghost gray `#D2D5DF` | Separates the class name from the `class` declaration keyword and keeps type names visually distinct. |
| Constants, enum members, and language variables | Shared variable accents | Named constants/enum members barley `#EDB378`; language variables ghost gray `#D2D5DF` | Follows the common constant/variable split so values such as enum members and `this` do not blend into ordinary identifiers. |
| Variables, parameters, and properties | Variables and parameters `#F3F4F7`, properties `#D2D5DF` | Variables/parameters bright blue `#41C4F7`, properties starlight `#F3F4F7` | Makes identifiers, arguments, and object members easier to distinguish in TypeScript code. |
| Library functions, constants, and variables | Shared function/type accents | Barley `#EDB378` | Separates framework/API symbols from user-defined functions and variables. |
| Namespaces and modules | Shared type accents | Ghost gray `#D2D5DF` | Gives module and namespace identifiers their own category without introducing a new hue. |
| HTML/XML tag names | African violet `#BAA4E5` | Bright blue `#41C4F7` | Separates document structure from attributes and preserves a 5.73:1 contrast ratio on the editor background. |
| HTML/XML attribute names | African violet `#BAA4E5` | Barley `#EDB378` | Gives attributes a distinct warm accent without using the same color as tag names. |
| HTML/XML tag punctuation | African violet `#BAA4E5` | Ghost gray `#D2D5DF` | Keeps angle brackets and closing syntax visually quiet so names and values remain easier to scan. |
| HTML/XML attribute names | Barley `#EDB378` | African violet `#BAA4E5` | Removes the concentration of warm tones in Angular bindings while preserving a 5.22:1 contrast ratio on the editor background. |
| HTML/XML attribute values | Almond creme `#FCC19F` | Ghost gray `#D2D5DF` | Separates literal values from names and bindings, reducing warm visual weight in template-heavy files. |
| HTML/XML attribute values | Ghost gray `#D2D5DF` | Almond creme `#FCC19F` | Restores a visible value accent after the neutral assignment made Angular templates too monochrome; attribute names remain African violet. |
| Primary button text/background | Dark blue `#1C3C55` / bright blue `#41C4F7` | Starlight `#F3F4F7` / dark blue `#1C3C55` | VS Code applies 40% opacity to disabled buttons; a light foreground remains more readable while the bright-blue border preserves focus and LCARS emphasis. |
| Active editor selection | African violet `#BAA4E5` with dark-blue text `#1C3C55` | Dirty mauve `#7A506D` at 25% opacity with starlight text `#F3F4F7` | Makes the lavender selection more visible while allowing the bright syntax colors to remain readable; the resulting starlight contrast is approximately 9.3:1 on the editor surface. |
| Active Explorer selection icons | Bright blue `#41C4F7` | Dark blue `#1C3C55` | Aligns file-type icons with the active filename and provides 5.22:1 contrast on the African-violet selection background. |
| Active Explorer selection | African violet `#BAA4E5` with dark-blue text `#1C3C55` | Dark blue `#1C3C55` with starlight text `#F3F4F7` | Replaces the lower-contrast lavender row with an AAA text treatment; the focused file remains distinct from the dark-gray sidebar. |
| Active Explorer selection icons | Dark blue `#1C3C55` | Bright blue `#41C4F7` | Restores a visible file-type accent on the dark active row while retaining 5.73:1 contrast. |
| Explorer hover selection | Medium dark gray `#52596E` with starlight text `#F3F4F7` | 25% barley `#EDB37840` over dark gray with starlight text `#F3F4F7` | Softens the hover state while retaining a visible yellow accent and approximately 6.48:1 text contrast against the blended sidebar surface. |
| PHP visibility and storage modifiers | Bright blue `#41C4F7` | African violet `#BAA4E5` | Separates `public`, `private`, `protected`, `readonly`, and related modifiers from the bright-blue `function` keyword. |
| TypeScript/JavaScript class keywords | Bright blue `#41C4F7` | Barley `#EDB378` | Aligns `class` with the class name while keeping `export` in the bright-blue keyword family. |
| TypeScript/JavaScript class keywords | Barley `#EDB378` | African violet `#BAA4E5` | Separates the `class` keyword from the barley class name while keeping `export` bright blue. |
| Previous TypeScript `private` and `readonly` modifiers | Shared bright blue `#41C4F7` | `private` African violet `#BAA4E5`; `readonly` bright blue `#41C4F7` | Historical entry: the removed grammar injection had assigned separate scopes to the two modifier words. |
| TypeScript modifier tokenization | Custom `private`/`readonly` grammar scopes | Generic `storage.modifier` fallback | Removes the theme-specific grammar injection and follows the common Marketplace theme pattern; semantic modifier tokens remain available when a language server supplies them. |

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
| Starlight `#F3F4F7` | 25% barley `#EDB378` over dark gray `#2F3749` | approximately 6.48:1 | AA |
| Starlight `#F3F4F7` | 25% dirty mauve `#7A506D` over dark blue `#1C3C55` | approximately 9.3:1 | AAA |

## Approved palette and usage

| Color | Hex | Current usage |
| --- | --- | --- |
| African violet | `#BAA4E5` | Active selections, suggestion selections, secondary buttons, keywords, function/method tokens, decorators, PHP visibility/storage modifiers, TypeScript/JavaScript class keywords, HTML/XML attribute names, terminal magenta. |
| Almond | `#D29B7F` | Terminal green and untracked Git decorations. |
| Almond creme | `#FCC19F` | Hovered primary and secondary buttons, active line numbers, HTML/XML attribute values, string and regular-expression tokens, bright terminal green. |
| Barley | `#EDB378` | Activity-bar icons, sidebar and panel headings, type tokens, named constants, enum members, library functions/constants/variables, labels, 25% translucent Explorer hover background, and bright terminal yellow. |
| Bluey | `#8899FF` | Word-highlight overview-ruler marker. |
| Brown | `#895129` | Bracket-match background. |
| Butterscotch | `#EA9C72` | Modified Git decorations and warning squiggle. |
| Dirty mauve | `#7A506D` | 25% opacity active editor selection overlay and find-match overview-ruler marker. |
| Dusty mauve | `#9D698A` | Selection-highlight overview-ruler marker. |
| Lilac | `#8A72A7` | Strong word-highlight overview-ruler marker and hint squiggle. |
| Mars | `#FF2200` | Error squiggle and error indicator only; never normal text. |
| Orange | `#EB943A` | Active links, panel and status borders, active-tab stripe, and terminal yellow. |
| Red | `#CF4F4F` | Decorative unfocused active-tab accent only; never text or a state indicator. |
| Subdued sienna | `#C47D69` | Modified overview-ruler marker. |
| True mauve | `#C082A9` | Badge backgrounds with dark-blue foreground text. |
| Blue | `#37A6D1` | Informational squiggle and inserted-diff border. |
| Bright blue | `#41C4F7` | Focus rings, links, input/widget borders, primary-button borders, active Explorer selection icons, operators, storage/modifier/variable/parameter tokens, export and PHP function keywords, numeric constants, HTML/XML tag names, terminal blue, and terminal cyan. |
| Dark blue | `#1C3C55` | Editor, terminal, title-bar, panel, inactive-tab, primary-button, and active Explorer selection backgrounds. |
| Dark gray | `#2F3749` | Sidebar, status bar, widgets, inputs, dropdowns, and line-highlight backgrounds. |
| Ghost gray | `#D2D5DF` | Secondary text, inactive labels, language variables, namespaces/modules, class names, library types/classes, HTML/XML tag punctuation, terminal white, and inactive tabs. |
| Light gray | `#9EA5BA` | Comments, placeholders, and inactive line numbers. |
| Light orange-red | `#FF6753` | Added-line gutter indicator only; never normal text. |
| Medium dark blue | `#2A7193` | Minimap background and hovered primary buttons. |
| Medium dark gray | `#52596E` | Active tabs, hover states, section headers, inactive selections, and indent guides. |
| Orange-red | `#E7442A` | Deleted-line gutter and removed-diff border. |
| Pale orange-red | `#FF977B` | Error text, invalid tokens, storage-type declaration tokens, deleted-resource text, editor cursor, headings, and terminal red. |
| Primary gray | `#6D748C` | Whitespace markers and bright terminal black. |
| Starlight | `#F3F4F7` | Main editor, object properties, buttons, sidebar, widget, terminal, tab, title-bar, status-bar, and Explorer hover text. |
