import jsep from 'jsep';

export const evaluateRule = (rule: string, data: string): boolean => {
  const parsedRule = jsep(rule);
  const count = (char: string) => (data.match(new RegExp(char, 'g')) || []).length;

  const evaluate = (node: jsep.Expression): any => {
    switch (node.type) {
      case 'BinaryExpression':
        const left = evaluate(node.left);
        const right = evaluate(node.right);
        return applyOperator(node.operator, left, right);
      case 'CallExpression':
        const func = node.callee.name;
        const args = node.arguments.map(evaluate);
        return applyFunction(func, args);
      case 'Literal':
        return node.value;
      case 'Identifier':
        return data[node.name];
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

