const fs = require("fs");
const path = require('path');
const { CodeGen } = require("swagger-taxos-codegen");

const file = path.join(__dirname, 'swagger.json');
const swagger = fs.readFileSync(file, "UTF-8").replace('«', '<').replace('»', '>');

const tsSourceCode = CodeGen.generateCode({
    swagger: JSON.parse(swagger),
    getMethodName(op, httpVerb, path) {
        return op.summary;
    },
    getNamespace(tag) {
        return tag.replace('-resource', 's');
    },
    prettierOptions: {
        printWidth: 120
    }
});

const outFile = path.join(__dirname, 'index.ts');
fs.writeFileSync(outFile, tsSourceCode, {encoding: 'UTF-8'});
