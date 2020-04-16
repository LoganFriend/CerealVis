#include <Random>
#include <math.h>


bool allow_data = false;
double count = 0.0;
 
void setup()
{
  Serial.begin(9600);
}

void loop()
{
  if (Serial.available()) 
  {
    serialEvent();
  }
  
  if (allow_data)
  {
    delay(15);
    Serial.println(512 * sin(2*M_PI*count) + 512);

    count += .01;
    if(count >= 1) count = 0;

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
