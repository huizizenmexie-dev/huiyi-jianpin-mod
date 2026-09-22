# Local font manifest

Downloaded 2026-09-23 from the official Google Fonts stylesheet and fonts.gstatic.com. All font files are unmodified WOFF2 variable subsets. Each family is licensed under SIL Open Font License 1.1; complete licenses are included with the distributable website.

## Delivery

`client/public/fonts/fonts.css` preserves the upstream Unicode ranges, declares `font-display: swap`, and uses relative font URLs so root and project-subpath deployments work identically. The browser fetches only faces whose characters and styles are present. Fraunces and Manrope Latin normal are preloaded for the wordmark, headings and body; other styles and scripts load when needed. There are no Google font requests at runtime. Chinese characters continue to use the operating-system fallback, as in the original font stack.

The local variable faces retain the existing font families and weights: Fraunces normal/italic 400–700, Manrope 400–700, Noto Sans Arabic 400–700, JetBrains Mono 400–500. Greek, Cyrillic, Vietnamese, Arabic, math, symbol and Latin subsets preserve upstream coverage without forcing every subset into one download.

## Official sources and licenses

- [Google Fonts stylesheet](https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400..700;1,400..700&family=Manrope:wght@400..700&family=Noto+Sans+Arabic:wght@400..700&family=JetBrains+Mono:wght@400..500&display=swap)
- [Fraunces license](https://raw.githubusercontent.com/google/fonts/main/ofl/fraunces/OFL.txt) — `client/public/fonts/licenses/fraunces-OFL.txt`
- [Manrope license](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt) — `client/public/fonts/licenses/manrope-OFL.txt`
- [Noto Sans Arabic license](https://raw.githubusercontent.com/google/fonts/main/ofl/notosansarabic/OFL.txt) — `client/public/fonts/licenses/noto-sans-arabic-OFL.txt`
- [JetBrains Mono license](https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/OFL.txt) — `client/public/fonts/licenses/jetbrains-mono-OFL.txt`

## File inventory

| File                                       |  Bytes | SHA-256                                                            | Official source                                                                                                                          |
| ------------------------------------------ | -----: | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `fraunces-italic-vietnamese.woff2`         |  12948 | `ac2dd51d493b4c65b18ee613fd17662990578396c5a38da441a8678d1a18f6bc` | [WOFF2](https://fonts.gstatic.com/s/fraunces/v38/6NUs8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9mvIiQvTm.woff2) |
| `fraunces-italic-latin-ext.woff2`          |  40528 | `877bcc2fd1be299c950d0971578336818ca5818e1e956f12e0d8c6736436ca45` | [WOFF2](https://fonts.gstatic.com/s/fraunces/v38/6NUs8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9mvMiQvTm.woff2) |
| `fraunces-italic-latin.woff2`              |  45656 | `bceec2ef4d549efbc8df0194a8d5280b6a64c3e399244dffccd9ea1bd9ad6db7` | [WOFF2](https://fonts.gstatic.com/s/fraunces/v38/6NUs8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9mv0iQg.woff2)   |
| `fraunces-normal-vietnamese.woff2`         |  11572 | `ce7b18aac7371cde4a740e54e252e9f02de67ff2ed444b18d1d04e66f50edeb0` | [WOFF2](https://fonts.gstatic.com/s/fraunces/v38/6NUu8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib14c0qv86Rg.woff2)   |
| `fraunces-normal-latin-ext.woff2`          |  33584 | `a21ecfbf41fbc393e24ef9b7e38532a27e8da5e0a074aa7d66802d1b5ccec2f0` | [WOFF2](https://fonts.gstatic.com/s/fraunces/v38/6NUu8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib14c1qv86Rg.woff2)   |
| `fraunces-normal-latin.woff2`              |  36620 | `7f9d191d999336d3b9790afa72e1358e50a13b06d4f289341e92a311967a80f9` | [WOFF2](https://fonts.gstatic.com/s/fraunces/v38/6NUu8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib14c7qv8.woff2)      |
| `jetbrains-mono-normal-cyrillic-ext.woff2` |   1640 | `62213be8a78b42f1e29d1452d91e2f8b3e745572a9dd98d3941e39fa00b37d76` | [WOFF2](https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx3cwhsk.woff2)        |
| `jetbrains-mono-normal-cyrillic.woff2`     |   8872 | `e17cfd15fb96909d64095015f958207063a0c07191da3512df7d560a781aebdf` | [WOFF2](https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxTcwhsk.woff2)        |
| `jetbrains-mono-normal-greek.woff2`        |   6836 | `0a557721b1f8b36d3f3f84442689a71ca4a744300abcb46a1953f51bfc663b66` | [WOFF2](https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxPcwhsk.woff2)        |
| `jetbrains-mono-normal-vietnamese.woff2`   |   5888 | `c89b9cc0bc6262bd4f8d8494b6961601f3aefa829d08c2e3635f4d501d3a47c2` | [WOFF2](https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx_cwhsk.woff2)        |
| `jetbrains-mono-normal-latin-ext.woff2`    |  11624 | `db5ff4db83e580426280e9337a58dc57d3a83784a1b03ad80914651594441d52` | [WOFF2](https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx7cwhsk.woff2)        |
| `jetbrains-mono-normal-latin.woff2`        |  31432 | `83c005d49d8a6a50474c73a5a36ac0468076e9c4a29da7bdb14995d80560a5be` | [WOFF2](https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwg.woff2)          |
| `manrope-normal-cyrillic-ext.woff2`        |   2552 | `de37de877dc17e4577341fa68bb5cb526b53d54cb29721e674208546a3c7849d` | [WOFF2](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggqxSuXd.woff2)                                                          |
| `manrope-normal-cyrillic.woff2`            |  14500 | `c268b459a9329e59fecf39a17618efd44c71735532048d60b12aab76a8c14914` | [WOFF2](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggOxSuXd.woff2)                                                          |
| `manrope-normal-greek.woff2`               |   9444 | `2fb2e8cbfd52ae46179a8b6024eb162f1f9c6de3d22d6e3a30d8f395de7220be` | [WOFF2](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggSxSuXd.woff2)                                                          |
| `manrope-normal-vietnamese.woff2`          |   8520 | `6bbb044ab420e07edb0a3042d2eb314b85e83a0182e945a15ab3b9092668dfd5` | [WOFF2](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggixSuXd.woff2)                                                          |
| `manrope-normal-latin-ext.woff2`           |  15120 | `3911b66d9f2e005a4b989223405d0e5032619c668597ba467cc76a23c8fffcfb` | [WOFF2](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggmxSuXd.woff2)                                                          |
| `manrope-normal-latin.woff2`               |  24836 | `a30ddcd349703aff7464c34bef3fffdff405ee50c113440d7c8693c02d210972` | [WOFF2](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSg.woff2)                                                            |
| `noto-sans-arabic-normal-arabic.woff2`     | 165960 | `ce85091f020920b65762b387b194ef59457ea5b25b760f2dcc35240a94bb8669` | [WOFF2](https://fonts.gstatic.com/s/notosansarabic/v33/nwpCtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlj4wv4r4xA.woff2)                     |
| `noto-sans-arabic-normal-math.woff2`       |  22716 | `2c7bffd56133bb333f6f23d240ba72ee767aa3e7de67cb71fb83bbb3595ded2b` | [WOFF2](https://fonts.gstatic.com/s/notosansarabic/v33/nwpCtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlj5Jv4r4xA.woff2)                     |
| `noto-sans-arabic-normal-symbols.woff2`    |  14584 | `090786c8626fb67f5c50809079ed7fe42eb68b95d1afccffeb86943ec10254a2` | [WOFF2](https://fonts.gstatic.com/s/notosansarabic/v33/nwpCtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlj5bv4r4xA.woff2)                     |
| `noto-sans-arabic-normal-latin-ext.woff2`  |  16816 | `27fe6458d54bcf13a2fe92228dd932ef3de9439267ca214e5c9f6bb02659e614` | [WOFF2](https://fonts.gstatic.com/s/notosansarabic/v33/nwpCtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlj47v4r4xA.woff2)                     |
| `noto-sans-arabic-normal-latin.woff2`      |  31416 | `fed070abc960c5f214fcb02b7b178cdab751ef7facd79a899f571bc21d38b8f8` | [WOFF2](https://fonts.gstatic.com/s/notosansarabic/v33/nwpCtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlj41v4o.woff2)                        |
