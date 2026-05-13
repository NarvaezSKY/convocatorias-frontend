declare module "divipola" {
  interface DivipolaRecord {
    mpioCode: string;
    mpioName: string;
    deptoName: string;
  }

  const divipolaData: DivipolaRecord[];
  export default divipolaData;
}
