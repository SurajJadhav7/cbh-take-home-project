# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
1. Instead of keeping if conditional on existence of event, we can simply return TRIVIAL_PARTITION_KEY if event is not present. This is because if event is not present, candidate will be undefined for sure. execution will go else candidate condition and return TRIVIAL_PARTITION_KEY. This refactoring will remove first if event condition and else candidate condition.
2. We can also remove if candidate condition because we will definitely get candidate when event is present, otherwise execution will stop at beginning itself.
3. we can move if typeof candidate condition in if (event.partitionKey) condition because else (event.partitionKey) will always set candidate as a string.
4. we can also move if (candidate.length > MAX_PARTITION_KEY_LENGTH) condition into if (event.partitionKey) condition because else (event.partitionKey) will always set candidate as a 256 letter string.