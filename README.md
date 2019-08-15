# Project 규칙

### Commit 규칙
`구현 내용`

```bash
영어로 작성시 첫글자 대문자

example.
    로그인 Design 완료
```

### Jira
```
git commit -m "Jira보드번호-이슈번호 | 구현 내용"
```

### Install
```
npm i @gitgraph/js
```

### GitBranch
```
Master
dev
feature/req4-2
feature/req4-3
feature/req4-4
feature/req4-5
feature/req4-6
feature/req4-7
feature/req4-8
```

### Vue Prettier

`vue create 프로젝트명`
```bash
Manually select features 선택 후,
선택되어 있는 것으로 Enter
'EsLint + Prettier' -> 'Lint on save' -> Enter...

`.eslintrc.js` 파일을 최상위 단위에 복사/붙여넣기
`package.json`에 `devDependencies`내용을 가지고 해당 프로젝트의 `package.json`에 붙여넣기
중복된 내용들도 알아서 처리 되기에 붙여넣은 후, `npm install`

Atom에서 `linter-eslint` 다운 받아 진행하면 됨.
```