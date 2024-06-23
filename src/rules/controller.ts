import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateRuleRequestBody, UpdateRuleRequestBody } from '../db/type/types';
import { ruleModel } from '../db/rulesModel/rules';
import { evaluateRule} from './services';

export const createRule = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
    try {
        const rule = new ruleModel(req.body);
        await rule.save();
        res.code(201).send({
            message: 'Rule created successfully',
            data: { rule },
        });
    } catch (err) {
        res.code(500).send({
            message: 'Error creating rule',
            error: err,
        });
    }
};

export const getRules = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
    try {
        const rules = await ruleModel.find();
        res.code(200).send({
            data: { rules },
        });
    } catch (err) {
        res.code(500).send({
            message: 'Error retrieving rules',
            error: err,
        });
    }
};

export const updateRule = async (req: FastifyRequest<{ Params: { id: string }; Body: UpdateRuleRequestBody }>, res: FastifyReply): Promise<void> => {
    try {
        const updatedRule = await ruleModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRule) {
            res.code(404).send({
                message: 'Rule not found',
            });
            return;
        }
        res.code(200).send({
            message: 'Rule updated successfully',
            data: { updatedRule },
        });
    } catch (err) {
        res.code(500).send({
            message: 'Error updating rule',
            error: err,
        });
    }
};

export const deleteRule = async (req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply): Promise<void> => {
    try {
        const deletedRule = await ruleModel.findByIdAndDelete(req.params.id);
        if (!deletedRule) {
            res.code(404).send({
                message: 'Rule not found',
            });
            return;
        }
        res.code(200).send({
            message: 'Rule deleted successfully',
        });
    } catch (err) {
        res.code(500).send({
            message: 'Error deleting rule',
            error: err,
        });
    }
};

export const evaluateData = async (
    req: FastifyRequest<{ Body: { ruleId: string; data: string } }>,
    res: FastifyReply
  ): Promise<void> => {
    try {
      const { ruleId, data } = req.body;
  
      const rule = await ruleModel.findById(ruleId);
  
      if (!rule) {
        res.code(404).send({
          message: 'Rule not found',
        });
        return;
      }
  
      const result = evaluateRule(rule.rule, data);
      res.code(200).send({
        message: 'Rule evaluation successful',
        data: { result },
      });
    } catch (err) {
      res.code(500).send({
        message: 'Error evaluating rule',
        error: err,
      });
    }
  };