from PIL import Image
from matplotlib import pyplot as plt

# Open images
p1 = Image.open(r"C:\Users\santh\OneDrive\Pictures\Epcet_cse_Manimozhi.jpg")
p2 = Image.open(r"C:\Users\santh\OneDrive\Pictures\neha.jpg")
p3 = Image.open(r"C:\Users\santh\OneDrive\Pictures\.trashed-1773144790-Picsart_26-02-08_17-35-15-117.png")

# Original images
plt.subplot(3, 2, 1)
plt.imshow(p1)
plt.title("Image 1")
plt.axis("off")

plt.subplot(3, 2, 2)
plt.imshow(p2)
plt.title("Image 2")
plt.axis("off")

plt.subplot(3, 2, 3)
plt.imshow(p3)
plt.title("Image 3")
plt.axis("off")

# Rotated images
plt.subplot(3, 2, 4)
plt.imshow(p1.rotate(90))
plt.title("Image 1 Rotated")
plt.axis("off")

plt.subplot(3, 2, 5)
plt.imshow(p2.rotate(290))
plt.title("Image 2 Rotated")
plt.axis("off")

plt.subplot(3, 2, 6)
plt.imshow(p3.rotate(290))
plt.title("Image 3 Rotated")
plt.axis("off")

plt.tight_layout()
plt.show()