bring ex;
bring cloud;
bring websockets;

class Util {
  extern "./util.js" pub static inflight _generateRandomHexcolor(): str;
  extern "./util.js" pub static inflight _generateRandomPosition(): Array<num>;
  extern "./util.js" pub static inflight _getRandomAnimal(): str;
}

let tb = new ex.DynamodbTable(
  name: "SpaceBeasts",
  hashKey: "id",
  attributeDefinitions: {
    "id": "S",
  }
) as "space-beasts-table";

let ws = new websockets.WebSocket(
  name: "SpaceBeasts"
) as "space-beasts-websocket";

let characters = inflight () => {
  let connections = tb.scan();
  for item in connections.items {
    ws.sendMessage(
      str.fromJson(item.get("id")), 
      Json.stringify(connections.items)
    );
  }
};

let move = inflight (id: str, body: Json) => {
  if let move = body.tryGet("move") {
    tb.updateItem({
      key: {
        "id": id
      },
      updateExpression: "SET #position = :position",
      expressionAttributeValues: {
        ":position": move
      },
      expressionAttributeNames: {
        "#position": "position"
      }
    });
  }
  characters();
};

ws.onConnect(inflight(id: str): void => {
  tb.putItem({
    item: {
      "id": id,
      "color": Util._generateRandomHexcolor(),
      "position": Util._generateRandomPosition(),
      "animal": Util._getRandomAnimal(),
    }
  });
});

ws.onDisconnect(inflight(id: str): void => {
  tb.deleteItem({
    key: {
      "id": id
    }
  });
  characters();
});

ws.onMessage(inflight (id: str, body: str): void => {
  if let jsonbody = Json.tryParse(body) {
    move(id, jsonbody);
  }

  if body == "characters" {
    characters();
  }
});

/* This method is temporarily required only for local execution (target sim) and will be deprecated in the future.
*/
// ws.initialize();

// let react = new ex.ReactApp(
//   projectPath: "../frontend"
// ) as "space-beats-app";

// react.addEnvironment("url", ws.url());
