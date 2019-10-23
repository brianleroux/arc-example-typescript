module.exports = function typescript(arc, cfn) {

  // look for lambdas
  let resources = Object.keys(cfn.Resources)
  let isLambda = nom=> cfn.Resources[nom].Type === 'AWS::Serverless::Function'

  // adds ./dist to CodeUris for function code
  resources.filter(isLambda).forEach(nom=> {
    let codeUri = cfn.Resources[nom].Properties.CodeUri
    cfn.Resources[nom].Properties.CodeUri = codeUri.replace('./', './dist/')
  })

  return cfn
}
