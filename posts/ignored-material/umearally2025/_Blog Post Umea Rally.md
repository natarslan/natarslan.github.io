Exploring the Impact of Rally Car Sounds on Reindeer: Umeå Rally 2025

When rally cars roar through the countryside, they don’t just make noise for us humans—they also impact wildlife. For instance, reindeer and deer rely on their hearing to detect predators and navigate their environment. So, how far does the noise from these cars travel? And how might it affect these animals?

In this post, I’ll walk you through the basic science of sound propagation and how I used a simple Python script to estimate the areas that might be affected by rally car noise. I'll also cover some key concepts like decibels (dB), dBA, and the factors that influence how sound travels in different conditions.

### 1. Understanding Decibels (dB) vs. dBA: What’s the Difference?

Let’s start with the basics. Sound is measured in **decibels (dB)**, which are a unit of sound intensity. Decibels are **logarithmic**, meaning that every increase of 10 dB represents a tenfold increase in intensity. For example, if a sound increases from 60 dB to 70 dB, it's ten times louder.

However, **dBA** is a special type of decibel measurement that takes into account how the human ear perceives sound. You see, humans don't hear all frequencies equally well—our ears are more sensitive to mid-range frequencies and less sensitive to both low and high frequencies. The **A-weighting** filter in dBA reduces the contribution of these extreme frequencies, which is why **dBA** is commonly used when evaluating noise levels in environments like cities or near loud machinery.

So, while **dB** measures pure sound intensity, **dBA** adjusts the intensity to reflect how we hear it. This means that the drop in **dBA** as sound travels can be a bit different from the straight 6 dB drop in regular **dB**.

For example, while the **inverse square law** generally tells us that sound drops by **6 dB** when the distance from a source doubles, in **dBA**, this might only be a **3 dB** reduction, especially when talking about the complex, mixed frequencies produced by a rally car.

### 2. Sound Propagation: Simplified!

Now, I’m no expert in sound propagation. But after reading some studies and doing a bit of thinking, I used the simplest, most straightforward method to estimate how far the sound of a rally car might travel. To be honest, the reality is probably more complicated than the model I used, with things like terrain, air temperature, and even the type of vegetation all playing a role in how sound disperses.

But, let’s keep it simple. Here’s what I did: I used the **inverse square law** for sound propagation to estimate how far the noise from rally cars at different dBA levels (120 dBA and 130 dBA) would travel. According to this law, sound intensity drops by **6 dB** every time the distance from the source doubles. In **dBA**, this can often be **3 dBA** due to how we perceive sound at different frequencies.

**Formula:**  
Distance = (Initial dBA - Target dBA) / Drop Rate (dB per meter)

To observe this, I created a Python script that calculates how far the noise travels at different dBA levels. Here’s the **original code** I used:

```python
import geopandas as gpd
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# --- Parameters ---
NOISE_LEVELS = [110, 100, 90, 80, 70, 60, 50]  # Target noise levels in dBA
INITIAL_NOISE = {120: 1}  # dBA at 1m for different cars
DROP_RATE = 0.128  # dB per meter (from research)

# --- Load Data ---
path_rally = r"/Users/nat/Desktop/SapmiHerding/Data/umea_rally/UmeaRallyLine.geojson"
output_shp_path = r"/Users/nat/Desktop/SapmiHerding/Output/noise_zones.shp"  # Output file path

target_crs = "EPSG:3857"  # Web Mercator for better mapping with basemaps
rally = gpd.read_file(path_rally).to_crs(target_crs)

# --- Calculate Noise Drop Distances ---
def calculate_distance(initial_dba, target_dba):
    return (initial_dba - target_dba) / DROP_RATE

distances = {car_dba: [calculate_distance(car_dba, level) for level in NOISE_LEVELS] for car_dba in INITIAL_NOISE}

# --- Create Noise Zones ---
noise_zones_list = []
for car_dba, dist_list in distances.items():
    for i, dist in enumerate(dist_list):
        buffer = rally.geometry.buffer(dist)
        noise_zone = gpd.GeoDataFrame({"Car_dBA": [car_dba], "Noise_Level_dBA": [NOISE_LEVELS[i]], "geometry": buffer}, crs=target_crs)
        noise_zones_list.append(noise_zone)

# Combine all buffers into a single GeoDataFrame
noise_zones_gdf = gpd.GeoDataFrame(pd.concat(noise_zones_list, ignore_index=True), crs=target_crs)

# Export to shapefile
noise_zones_gdf.to_file(output_shp_path)

# --- Plot the Map with Basemap and Zoom In ---
fig, ax = plt.subplots(figsize=(12, 12))
rally.plot(ax=ax, color='black', linewidth=2, label='Rally Route')

colors = ['red', 'orange', 'yellow', 'lightgreen', 'cyan', 'blue', 'purple']
labels = [f"{NOISE_LEVELS[i]} dBA" for i in range(len(NOISE_LEVELS))]

for i, noise_zone in enumerate(noise_zones_list):
    noise_zone.plot(ax=ax, color=colors[i % len(colors)], alpha=0.3, edgecolor='none', label=f"{noise_zone['Car_dBA'].iloc[0]} dBA {noise_zone['Noise_Level_dBA'].iloc[0]} dBA")

# Add basemap for better visualization
ax.set_xlim(rally.total_bounds[0] - 500, rally.total_bounds[2] + 500)
ax.set_ylim(rally.total_bounds[1] - 500, rally.total_bounds[3] + 500)

plt.legend()
plt.title("Noise Propagation from Rally Cars")
plt.xlabel("Easting (m)")
plt.ylabel("Northing (m)")
plt.show()
```

### 3. How Does Sound Behave in the Environment?

Besides just the basic physics of sound propagation, there are other important factors to consider when evaluating how sound travels in nature, especially in the Umeå rally area.

- **Cold and Warm Air**: The temperature of the air can have a huge impact on how sound propagates. Cold air tends to cause sound to travel closer to the ground, while warm air can cause the sound to rise. So, depending on the weather conditions, the sound from the rally could either travel farther or dissipate more quickly.
    
- **Terrain**: In open terrain, sound can travel farther, whereas in dense forests, high-frequency sounds (like tire squeals) will get absorbed more quickly by vegetation, making the impact less severe at greater distances.
    

### 4. The Real-World Complexity

I must admit—I'm no expert in acoustics! The method I used is a simple estimation, and the actual reality of how rally car noise propagates might be way more complex. Factors like air temperature, the type of terrain, and even the vehicle's exhaust system will all influence how the sound spreads. This method gives us a general idea, but it’s important to remember that sound in nature doesn’t always behave like a simple equation.

### 5. What We Learned and Next Steps

From the calculations, we can estimate the distances at which rally car noise could reach certain dBA levels, and therefore, where deer and reindeer might be disturbed by the sounds. However, as you can imagine, there are many environmental factors in play. Next, it would be useful to study deer movement patterns before and after rally events to get a better sense of how they are impacted.

### 6. Additional Resources

For those interested in learning more, here are a few resources:

- **Inverse Square Law**: [Wikipedia - Inverse Square Law](https://en.wikipedia.org/wiki/Inverse-square_law)
- **A-Weighted Decibels**: [Wikipedia - A-Weighting](https://en.wikipedia.org/wiki/A-weighting)
- **Sound Propagation in Nature**: [Science Direct - Sound Propagation](https://www.sciencedirect.com/topics/earth-and-planetary-sciences/sound-propagation)

---

Feel free to adjust or expand the post further, but this should give you a good starting point! Let me know if you need anything else.