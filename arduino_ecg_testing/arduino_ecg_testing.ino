#include <Random>

int frequency = 15;
bool allow_data = false;
 
void setup()
{
  Serial.begin(9600);
}

void loop()
{
  if (Serial.available()) // needed when not using the Ardunino
  {
    serialEvent();
  }
  
  if (allow_data)
  {
    int final_reading = 0;

    for(int i = 0; i < frequency; i++)
    {
      final_reading += random(1024);
      delay(15);
    }

    final_reading /= frequency;

    Serial.println(final_reading);
  }
}

void serialEvent()
{
  String raw_input = Serial.readString();

  switch (raw_input[0])
  {
    case 'g': allow_data = true; break;
    case 'p': allow_data= false; break;
    default: break;
  }
}
