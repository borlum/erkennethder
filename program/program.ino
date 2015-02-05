#include <SPI.h>
#include <Ethernet.h>
#include <WebServer.h>
#include <JsonGenerator.h>

using namespace ArduinoJson::Generator;

EthernetClient client;
static uint8_t mac[] = { 0x90, 0xA2, 0xDA, 0x0F, 0xAD, 0xF8 };
static uint8_t ip[] = { 172, 26, 13, 44 };

WebServer webserver("", 80);

#define KENNETH_INPUT 8
int state = 0;

void index(WebServer &server, WebServer::ConnectionType type, char *, bool) {
    server.httpSuccess();
    if (type != WebServer::HEAD) {
        JsonObject<1> resp;
        resp["response"] = "Er Kenneth der?";
        server.print(resp);
    }
}

void status(WebServer &server, WebServer::ConnectionType type, char *, bool) {
    server.httpSuccess();
    if (type != WebServer::HEAD) {
        if (state == 1) {
            JsonObject<2> resp;
            resp["status"] = state;
            resp["msg"] = "Kenneth er her!";
            server.print(resp);
        } else {
            JsonObject<2> resp;
            resp["status"] = state;
            resp["msg"] = "Kenneth er her ikke!";
            server.print(resp);
        }
    }
}

void setup() {
    Serial.begin(9600);
    pinMode(KENNETH_INPUT, INPUT);
    
    Ethernet.begin(mac, ip);

    webserver.setDefaultCommand(&index);
    webserver.addCommand("status.json", &status);
    webserver.begin();
}

void loop() {
    char buff[64];
    int len = 64;
    webserver.processConnection(buff, &len);
    state = digitalRead(KENNETH_INPUT);
}