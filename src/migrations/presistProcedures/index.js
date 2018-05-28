import gql from "graphql-tag";

import client from "../../graphql/client";
import VotesLocal from "../../services/VotesLocal";

import VOTES_LOCAL from "../../graphql/queries/votesLocal";
import VOTES_LOCAL_KEYSTORE from "../../graphql/queries/votesLocalKeyStore";

console.warn("SET UP migratedVersion");

export default async () => {
  const { votesLocal } = client.readQuery({
    query: VOTES_LOCAL
  });
  console.log(
    "test",
    await client.query({
      query: VOTES_LOCAL_KEYSTORE,
      fetchPolicy: "network-only"
    })
  );
  console.log("VotesLocal", votesLocal);
  if (votesLocal.length > 0) {
    const { data: { proceduresById } } = await client.query({
      query: gql`
        query proceduresById($ids: [String!]!) {
          proceduresById(ids: $ids) {
            _id
            procedureId
          }
        }
      `,
      variables: {
        ids: votesLocal.map(({ procedure }) => procedure)
      }
    });

    await Promise.all(
      proceduresById.map(async ({ _id, procedureId }) => {
        try {
          const { selection } = votesLocal.find(
            ({ procedure }) => procedure === _id
          );

          return await VotesLocal.setVoteLocal({ procedureId, selection });
        } catch (error) {
          return undefined;
        }
      })
    );
    console.warn("Remove this line");
    await VotesLocal.resetVotesLocal();
    return true;
  }
  console.warn("Remove this line");
  await VotesLocal.resetVotesLocal();
  return false;
};
