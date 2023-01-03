const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the same partitionkey string when given event with partitionkey string less than MAX_PARTITION_KEY_LENGTH", () => {
    const partitionkey = deterministicPartitionKey({
      partitionKey: "partitionkey",
    });
    expect(partitionkey).toBe("partitionkey");
  });
  
  it("Returns the different partitionkey string when given event with partitionkey string more than MAX_PARTITION_KEY_LENGTH", () => {
    const partitionkey = deterministicPartitionKey({
      partitionKey:
        "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862asdfqwerc1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862asdfqwer",
    });
    expect(partitionkey).toBe(
      "f37cd44f80c3e0e56711f9cdce37d07cb430ea043e77d8facd20fad961021c080f8e44073331f00a93c8adf97541854f32b4660845a49f7dd72256d454d40657"
    );
  });
  
  it("Returns a JSON stringified partitionkey object when given event with partitionkey as object", () => {
    const partitionkey = deterministicPartitionKey({
      partitionKey: { newKey: "partitionkey" },
    });
    expect(partitionkey).toBe('{"newKey":"partitionkey"}');
  });
  
  it("Returns a JSON stringified partitionkey object when given event with partitionkey as number", () => {
    const partitionkey = deterministicPartitionKey({ partitionKey: 12433 });
    expect(partitionkey).toBe("12433");
  });
  
  it("Returns hashed empty object when given event without partitionkey", () => {
    const partitionkey = deterministicPartitionKey({});
    expect(partitionkey).toBe(
      "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862"
    );
  });
  
  it("Returns hashed given object when given event without partitionkey but different key ", () => {
    const partitionkey = deterministicPartitionKey({
      partitionKey2: "partitionkey2",
    });
    expect(partitionkey).toBe(
      "0e35938a11e159c210aeffd68defa32089c1b669325cfe74cce2910b20c018e3e568533a971e7c9520be3d010c925060be7aa500d8c7939423a2ae1ac7767925"
    );
  });
  

});
