/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/dao.json`.
 */
export type Dao = {
  "address": "4px1Sz7eXme8y7gPUJjwCYsb3BeL6yMRzyLFkyBqjicj",
  "metadata": {
    "name": "dao",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "intialiseProposal",
      "discriminator": [
        212,
        78,
        239,
        159,
        88,
        25,
        177,
        0
      ],
      "accounts": [
        {
          "name": "proposalAcc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "title"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "message",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateProposal",
      "discriminator": [
        255,
        180,
        3,
        222,
        141,
        207,
        61,
        133
      ],
      "accounts": [
        {
          "name": "proposalAcc",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "title"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "message",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "proposalRecord",
      "discriminator": [
        154,
        180,
        211,
        203,
        232,
        223,
        142,
        147
      ]
    }
  ],
  "types": [
    {
      "name": "proposalRecord",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "message",
            "type": "string"
          },
          {
            "name": "id",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
