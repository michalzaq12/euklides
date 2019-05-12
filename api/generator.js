const fs = require("fs");
const path = require('path');
const camelCase = require('lodash/camelCase');
const { CodeGen } = require("swagger-taxos-codegen");

const file = path.join(__dirname, 'swagger.json');
const swagger = fs.readFileSync(file, "UTF-8")
    .replace(/\xAB/g, '<').replace(/\xBB/g, '>');

const tsSourceCode = CodeGen.generateCode({
    swagger: JSON.parse(swagger),
    getMethodName(op, httpVerb, path) {
        return camelCase(op.summary);
    },
    getNamespace(tag) {
        return tag.replace('-resource', 's');
    },
    prettierOptions: {
        printWidth: 120
    }
});

const outFile = path.join(__dirname, 'apiMethods.ts');
fs.writeFileSync(outFile, tsSourceCode, {encoding: 'UTF-8'});
