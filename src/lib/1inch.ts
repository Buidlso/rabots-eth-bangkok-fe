const {
  SDK,
  HashLock,
  PrivateKeyProviderConnector,
  NetworkEnum,
} = require("@1inch/cross-chain-sdk");

const { Web3, Contract } = require("web3");
const { solidityPackedKeccak256 } = require("ethers");
const { randomBytes } = require("ethers");
const { PUBLIC_KEY, PVT_KEY, Contracts, INFURA_URL } = require("../constants");
const { approve } = require("../utils/approve");

// TODO write formal bug for this function being inaccessible
function getRandomBytes32() {
  // for some reason the cross-chain-sdk expects a leading 0x and can't handle a 32 byte long hex string
  return "0x" + Buffer.from(randomBytes(32)).toString("hex");
}

const makerPrivateKey = PVT_KEY;
const makerAddress = PUBLIC_KEY;
const nodeUrl = INFURA_URL; // suggested for ethereum https://eth.llamarpc.com
const devPortalApiKey = "LbIpCTk9myxSu8EgneNDOjs5hn1yPAWJ";

// Validate environment variables
if (!makerPrivateKey || !makerAddress || !nodeUrl || !devPortalApiKey) {
  throw new Error(
    "Missing required environment variables. Please check your .env file."
  );
}

const web3Instance = new Web3(nodeUrl);

const blockchainProvider = new PrivateKeyProviderConnector(
  makerPrivateKey,
  web3Instance
);

const sdk = new SDK({
  url: "https://api.1inch.dev/fusion-plus",
  authKey: devPortalApiKey,
  blockchainProvider,
});

let srcChainId = NetworkEnum.ARBITRUM;
let dstChainId = NetworkEnum.COINBASE;
let srcTokenAddress = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";
let dstTokenAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

const invert = false;

if (invert) {
  const temp = srcChainId;
  srcChainId = dstChainId;
  dstChainId = temp;

  const tempAddress = srcTokenAddress;
  srcTokenAddress = dstTokenAddress;
  dstTokenAddress = tempAddress;
}

const params = {
  srcChainId,
  dstChainId,
  srcTokenAddress,
  dstTokenAddress,
  amount: "300000",
  enableEstimate: true,
  walletAddress: makerAddress,
};

async function test() {
  try {
    // await approve("0xaf88d065e77c8cC2239327C5EDb3A432268e5831", Contracts.INCH_AGGREGATION_ROUTER)
    sdk
      .getQuote(params)
      .then(async (quote: any) => {
        const secretsCount = quote.getPreset().secretsCount;

        const secrets = Array.from({ length: secretsCount }).map(() =>
          getRandomBytes32()
        );
        const secretHashes = secrets.map((x) => HashLock.hashSecret(x));

        const hashLock =
          secretsCount === 1
            ? HashLock.forSingleFill(secrets[0])
            : HashLock.forMultipleFills(
                secretHashes.map((secretHash, i) =>
                  solidityPackedKeccak256(
                    ["uint64", "bytes32"],
                    [i, secretHash.toString()]
                  )
                )
              );

        console.log("Received Fusion+ quote from 1inch API");

        sdk
          .placeOrder(quote, {
            walletAddress: makerAddress,
            hashLock,
            secretHashes,
          })
          .then((quoteResponse: any) => {
            const orderHash = quoteResponse.orderHash;

            console.log(`Order successfully placed`);

            const intervalId = setInterval(() => {
              console.log(
                `Polling for fills until order status is set to "executed"...`
              );
              sdk
                .getOrderStatus(orderHash)
                .then((order: any) => {
                  if (order.status === "executed") {
                    console.log(`Order is complete. Exiting.`);
                    clearInterval(intervalId);
                  }
                })
                .catch((error: any) =>
                  console.error(`Error: ${JSON.stringify(error, null, 2)}`)
                );

              sdk
                .getReadyToAcceptSecretFills(orderHash)
                .then((fillsObject: any) => {
                  if (fillsObject.fills.length > 0) {
                    fillsObject.fills.forEach((fill: any) => {
                      sdk
                        .submitSecret(orderHash, secrets[fill.idx])
                        .then(() => {
                          console.log(
                            `Fill order found! Secret submitted: ${JSON.stringify(
                              secretHashes[fill.idx],
                              null,
                              2
                            )}`
                          );
                        })
                        .catch((error: any) => {
                          console.error(
                            `Error submitting secret: ${JSON.stringify(
                              error,
                              null,
                              2
                            )}`
                          );
                        });
                    });
                  }
                })
                .catch((error: any) => {
                  console.error(
                    `Error getting ready to accept secret fills: ${error}`
                  );
                });
            }, 5000);
          })
          .catch((error: any) => {
            console.dir(error, { depth: null });
          });
      })
      .catch((error: any) => {
        console.log(error);
      });
  } catch (error: any) {
    console.log(error.response);
  }
}

test();
