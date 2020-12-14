from django.http.response import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser, MultiPartParser
import base64
from PIL import Image
import cv2
import numpy as np
from io import BytesIO

class MonitoramentoApi(APIView):
    parser_classes = [JSONParser]

    def pallet(self, image1, image2):
        # load images
        image1 = cv2.imread(image1)
        image2 = cv2.imread(image2)

        # resize images
        resized = cv2.resize(image2, (300, 300), interpolation = cv2.INTER_AREA)
        resized = cv2.resize(image2, (300, 300), interpolation = cv2.INTER_AREA)


        #--- take the absolute difference of the images ---
        res = cv2.absdiff(image1, image2)

        #--- convert the result to integer type ---
        res = res.astype(np.uint8)

        #--- find percentage difference based on number of pixels that are not zero ---
        percentage = (np.count_nonzero(res) * 100)/ res.size

        return percentage

    def post(self, request):
        # save the image
        im = Image.open(BytesIO(base64.b64decode(request.data['image'])))
        im.save('image.png', 'PNG')
        # process the algorithm
        if self.pallet('image.png', 'padrao.png') > 1:
            return JsonResponse(data={'status' : '1', 'message' : 'NOT OK'}, status=400)
        
        return JsonResponse(data={'status' : '0', 'message' : 'OK'}, status=200)