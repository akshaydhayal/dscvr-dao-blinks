/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/dapp.json`.
 */
export type Dapp = {
  "address": "G6oJmwpPf4mdsLrsiMQiUppEPXWjjpP46R7igqVoiiDb",
  "metadata": {
    "name": "dapp",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initialise",
      "discriminator": [
        162,
        198,
        118,
        235,
        215,
        247,
        25,
        118
      ],
      "accounts": [
        {
          "name": "numberAcc",
          "writable": true,
          "signer": true
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
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "number",
      "discriminator": [
        224,
        99,
        218,
        251,
        34,
        166,
        72,
        239
      ]
    }
  ],
  "types": [
    {
      "name": "number",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "val",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
