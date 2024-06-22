import { Request, Response } from 'express';
import { ruleModel } from '../db/rulesModel/rules';

export const createRule = async (req: Request, res: Response) => {
  const { rule } = req.body;
  const userId = (req as any).user.id;

  try {
    const newRule = new ruleModel({ userId, rule });
    await newRule.save();

    res.status(201).send(newRule);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getRules = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  try {
    const rules = await ruleModel.find({ userId });
    res.status(200).send(rules);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateRule = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rule } = req.body;
  const userId = (req as any).user.id;

  try {
    const updatedRule = await ruleModel.findOneAndUpdate({ _id: id, userId }, { rule }, { new: true });

    if (!updatedRule) {
      return res.status(404).send('Rule not found');
    }

    res.status(200).send(updatedRule);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteRule = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user.id;

  try {
    const deletedRule = await ruleModel.findOneAndDelete({ _id: id, userId });

    if (!deletedRule) {
      return res.status(404).send('Rule not found');
    }

    res.status(200).send('Rule deleted');
  } catch (error) {
    res.status(500).send(error);
  }
};
