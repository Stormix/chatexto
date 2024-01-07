
from flask_inputs import Inputs
from flask_inputs.validators import JsonSchema

greeting_schema = {
   'type': 'object',
   'properties': {
       'word': {
           'type': 'string',
       },
       'guess': {
            'type': 'string',
       }
   },
   'required': ['word', 'guess']
}


class PredictionInput(Inputs):
   json = [JsonSchema(schema=greeting_schema)]


def validate_payload(request):
   inputs = PredictionInput(request)
   if inputs.validate():
       return None
   else:
       return inputs.errors