import torch
from PIL import Image
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import cv2
import numpy as np

# Load the YOLOv5 model with custom weights
model = torch.hub.load('ultralytics/yolov5', 'custom', path='best.pt')

# Function to perform object detection on an image
class dector():

    def detect_objects(image_path, output_path):
    # Load image
        print(f"Loading image from {image_path}")
        image = Image.open(image_path)
        image_np = np.array(image)

        # Perform inference
        print("Performing inference...")
        results = model(image)

        # Convert results to OpenCV format
        image_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

        # Plot bounding boxes and labels
        for *box, conf, cls in results.xyxy[0]:
            xmin, ymin, xmax, ymax = [int(val) for val in box]
            label = model.names[int(cls)]
            confidence = float(conf)

            # Draw rectangle and label on image
            cv2.rectangle(image_cv, (xmin, ymin), (xmax, ymax), (0, 0, 255), 2)
            cv2.putText(image_cv, f'{label} {confidence:.2f}', (xmin, ymin - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

        # Save the result to the output path
        print(f"Saving processed image to {output_path}")
        cv2.imwrite(output_path, image_cv)
        




# Path to your input image and output image

# object_d = dector()

# image_path = 'test/images/000055.jpg'
# output_path = 'outputs/output.jpg'
# dector.detect_objects(image_path,output_path)
# # Detect objects in the image
# detect_objects(image_path, output_path)

def new(inp,out):
    object_d = dector()
    dector.detect_objects(inp,out)

