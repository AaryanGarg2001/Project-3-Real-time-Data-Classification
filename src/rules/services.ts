import jsep from 'jsep';

export const evaluateRule = (rule: string, data: String): boolean => {
  const parsedRule = jsep(rule);
  const count = (char: string) => (data?.match(new RegExp(char, 'g')) || []).length;

  const evaluate = (node: jsep.Expression): any => {
    if (!node) {
      throw new Error('Undefined node encountered during evaluation');
    }

    switch (node.type) {
      case 'BinaryExpression': {
        const binaryNode = node as jsep.BinaryExpression;
        const left = evaluate(binaryNode.left as jsep.Expression);
        const right = evaluate(binaryNode.right as jsep.Expression);
        return applyOperator(binaryNode.operator, left, right);
      }
      case 'CallExpression': {
        const callNode = node as jsep.CallExpression;
        if (callNode.callee.type !== 'Identifier') {
          throw new Error('Unsupported callee type');
        }
        const func = (callNode.callee as jsep.Identifier).name;
        const args = callNode.arguments.map(arg => evaluate(arg as jsep.Expression));
        return applyFunction(func, args);
      }
      case 'Literal': {
        const literalNode = node as jsep.Literal;
        return literalNode.value;
      }
      case 'Identifier': {
        const identifierNode = node as jsep.Identifier;
        if (!(identifierNode.name in data)) {
          throw new Error(`Undefined identifier: ${identifierNode.name}`);
        }
        return identifierNode.name;
      }
      default:
        throw new Error(`Unsupported node type: ${node.type}`);
    }
  };

  const applyOperator = (operator: string, left: any, right: any): boolean => {
    switch (operator) {
      case '>':
        return left > right;
      case '<':
        return left < right;
      case '>=':
        return left >= right;
      case '<=':
        return left <= right;
      case '==':
        return left == right;
      case '!=':
        return left != right;
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  };

  const applyFunction = (func: string, args: any[]): any => {
    switch (func) {
      case 'count':
        if (typeof args[0] !== 'string') {
          throw new Error('Argument to count must be a string');
        }
        return count(args[0]);
      case 'sum':
        return args.reduce((a, b) => a + b, 0);
      case 'max':
        return Math.max(...args);
      default:
        throw new Error(`Unsupported function: ${func}`);
    }
  };

  return evaluate(parsedRule);
};

// Example usage
// const rule = 'sum(max(count("a"),count("b")),count("z")) >= 5';
// const data = 'The weather in Bangalore is amids the advisable lot, although the whole india is going through a heat wave';
// console.log(evaluateRule(rule, data)); // Outputs: true
