import { ai } from "@/common/openai/client";

const frontmatter = "The following is a list of nested categories. The first element is the root.";

export const createEmbeddings = async (categoryMatrix: string[][]) => {
  const docs = categoryMatrix.map((categories) => {
    const list = categories.map((category, index) => `${index + 1}. ${category}`);
    return [frontmatter, list].join("\n");
  });

  const chunkSize = 100;
  let chunkStart = 0;
  const dataArray: number[][] = [];
  console.log("Creating", docs.length, "embeddings...");

  while (chunkStart < docs.length) {
    const chunk = docs.slice(chunkStart, chunkStart + chunkSize);
    console.log(`Embedding chunk (${chunkStart}-${chunkStart + chunkSize}) containing ${chunk.length} docs`);

    const response = await ai.embeddings.create({ model: "text-embedding-ada-002", input: chunk });
    const embeddings = response.data.map(({ embedding }) => embedding);

    chunkStart += chunkSize;

    dataArray.push(...embeddings);
  }

  console.log(`Successfully created ${dataArray.length} embeddings.`);

  return dataArray;
};
