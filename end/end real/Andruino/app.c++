#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);  // LCD pins configuration
String readString;  // To store incoming data

void setup() {
  Serial.begin(9600);  // Start serial communication
  lcd.begin(16, 2);    // Initialize 16x2 LCD
}

void loop() {
  // Check if data is available from Serial (App input)
  while(Serial.available()) {
    delay(50);  // delay to allow data to received
    char c = Serial.read();  // Read the incoming character
    readString += c;  // Append to the received data
  }

  // If we have received a command or message
  if(readString.length() > 0) {
    Serial.println(readString);  // Print the received data for debugging

    // dropdown menu
    if (readString == "button_1") {
      lcd.clear();
      lcd.print("Arduino");
    }
    else if (readString == "button_2") {
      lcd.clear();
      lcd.print("Hello");
    }
    else if (readString == "button_3") {
      lcd.clear();
      lcd.print("Stay away");
    }
    else if (readString == "button_4") {
      lcd.clear();
      lcd.print("End project");
    } 
    //manual text
    else {
      lcd.clear();
      lcd.print(readString);  // Display other
    }

    // Clear the string
    readString = "";
  }
}
