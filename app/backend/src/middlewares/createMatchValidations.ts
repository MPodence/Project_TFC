import { NextFunction, Request, Response } from 'express';

class MatchValidations {
  static createValidations = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }
    next();
  };
}

export default MatchValidations;
