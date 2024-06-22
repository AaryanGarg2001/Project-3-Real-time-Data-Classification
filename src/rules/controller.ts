// import { Request, Response } from 'express';
// import { ruleModel } from '../db/rulesModel/rules';

// export const createRule = async (req: Request, res: Response) => {
//   const { rule } = req.body;
//   const userId = (req as any).user.id;

//   try {
//     const newRule = new ruleModel({ userId, rule });
//     await newRule.save();

//     res.status(201).send(newRule);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// export const getRules = async (req: Request, res: Response) => {
//   const userId = (req as any).user.id;

//   try {
//     const rules = await ruleModel.find({ userId });
//     res.status(200).send(rules);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// export const updateRule = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { rule } = req.body;
//   const userId = (req as any).user.id;

//   try {
//     const updatedRule = await ruleModel.findOneAndUpdate({ _id: id, userId }, { rule }, { new: true });

//     if (!updatedRule) {
//       return res.status(404).send('Rule not found');
//     }

//     res.status(200).send(updatedRule);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// export const deleteRule = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const userId = (req as any).user.id;

//   try {
//     const deletedRule = await ruleModel.findOneAndDelete({ _id: id, userId });

//     if (!deletedRule) {
//       return res.status(404).send('Rule not found');
//     }

//     res.status(200).send('Rule deleted');
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// src/controllers/ruleController.ts

import { FastifyRequest, FastifyReply } from 'fastify';
// import { rule } from '../models/ruleModel'; // Assuming you have a rule model
import { CreateRuleRequestBody, UpdateRuleRequestBody } from '../db/type/types';
import { ruleModel } from '../db/rulesModel/rules';
import { evaluateRule } from './services';
// import { evaluateRule } from '../utils/ruleEvaluator'; // Assuming you have an evaluateRule function

export const createRule = async (req: FastifyRequest<{ Body: CreateRuleRequestBody }>, res: FastifyReply): Promise<void> => {
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

// export const evaluateData = async (req: FastifyRequest<{ Body: { rule: string; data: string } }>, res: FastifyReply): Promise<void> => {
//     try {
//         const { rule, data } = req.body;
//         const result = evaluateRule(rule, data);
//         res.code(200).send({
//             message: 'Rule evaluation successful',
//             data: { result },
//         });
//     } catch (err) {
//         res.code(500).send({
//             message: 'Error evaluating rule',
//             error: err,
//         });
//     }
// };
