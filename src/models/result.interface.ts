import { IAccount, IUser, ISimcard } from './' 

export interface IResult {
  account?: IAccount,
  user?: IUser,
  sim?: ISimcard,
  sim_cards?: ISimcard[]
}
