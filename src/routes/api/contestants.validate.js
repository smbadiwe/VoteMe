import * as valError from "../../ValidationErrors";
import ElectionService from "../../db/services/elections.service";
import MemberService from "../../db/services/users.service";

export function validateContestantOnAdd(payload) {
  if (!payload) throw new valError.NoDataReceived();

  const { member_id, election_id } = payload;

  // digits
  if (validator.isInt(member_id, { gt: 0 })) throw new valError.PositiveNumber("member_id");
  if (validator.isInt(election_id, { gt: 0 })) throw new valError.PositiveNumber("election_id");

  // Actual Ids
  const member = new MemberService().getById(member_id);
  if (!member) throw new valError.NonExistentId("member_id");

  const election = new ElectionService().getById(election_id);
  if (!election) throw new valError.NonExistentId("election_id");
}
