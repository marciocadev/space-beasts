bring ex;
bring cloud;
bring websockets;

struct PlayerData {
  animal: str;
  color: str;
  position: Array<num>;
}

class Util {
  extern "./util.js" pub static inflight _generateRandomHexcolor(): str;
  extern "./util.js" pub static inflight _generateRandomPosition(): Array<num>;
  extern "./util.js" pub static inflight _getRandomAnimal(): str;
  extern "./util.js" pub static inflight _initPlayer(): PlayerData;
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
  let animal = Util._initPlayer();

  tb.putItem({
    item: {
      "id": id,
      "color": animal.color,//Util._generateRandomHexcolor(),
      "position": animal.position,//Util._generateRandomPosition(),
      "animal": animal.animal,//Util._getRandomAnimal(),
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

ws.initialize();

let react = new ex.ReactApp(
  projectPath: "../frontend"
) as "space-beats-app";

react.addEnvironment("url", ws.url());
