/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/journal.json`.
 */
export type Journal = {
  "address": "G6oJmwpPf4mdsLrsiMQiUppEPXWjjpP46R7igqVoiiDb",
  "metadata": {
    "name": "journal",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "intialiseJournal",
      "discriminator": [
        215,
        33,
        49,
        238,
        130,
        93,
        77,
        63
      ],
      "accounts": [
        {
          "name": "journalAcc",
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
      "name": "updateJournal",
      "discriminator": [
        28,
        149,
        175,
        76,
        15,
        92,
        52,
        175
      ],
      "accounts": [
        {
          "name": "journalAcc",
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
      "name": "journalRecord",
      "discriminator": [
        113,
        152,
        78,
        125,
        8,
        90,
        49,
        121
      ]
    }
  ],
  "types": [
    {
      "name": "journalRecord",
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
