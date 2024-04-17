## tx-debug (fluence-debugger)

## Usage
`npx fluence-debugger`

Example:
```
✔ Debug type › From/to/calldata
✔ Select chain › Kras
✔ From address … 0x7ca0941C4ad6f92320FEA73042140dD687053988
✔ To address … 0xb0f7AceA17aE7892B0432e89E467f55f57B76Cef
✔ Calldata … 0x92163b4b
Tracing with cast...
Traces:
  [22561] 0xb0f7AceA17aE7892B0432e89E467f55f57B76Cef::92163b4b()
    ├─ [17694] 0x9BEe85D8c40D720287F20e7fF25288b0C7C06DD4::92163b4b() [delegatecall]
    │   ├─ [10072] 0xd5439DF0723Ab1ee7Ded6a3EBEf6BF23e8087958::currentEpoch() [staticcall]
    │   │   ├─ [5205] 0xB4c09b53E5317cF1a9E351143E8009433AD637d2::currentEpoch() [delegatecall]
    │   │   │   └─ ← [Return] 0x000000000000000000000000000000000000000000000000000000000000001d
    │   │   └─ ← [Return] 0x000000000000000000000000000000000000000000000000000000000000001d
    │   └─ ← [Return] 0x8a8605c93cf17fba95650e1ec925939229dfb8c4bdf566a0ecd6e259977e463f
    └─ ← [Return] 0x8a8605c93cf17fba95650e1ec925939229dfb8c4bdf566a0ecd6e259977e463f


Transaction successfully executed.
Gas used: 43625
```