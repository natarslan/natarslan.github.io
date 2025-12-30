tags: code

[[Projects/code/miners-strike/_photos/strikeweather.jpg]]
# 🪨 Strike Weather: Exploring the 1984 Miners' Strike Summer

## 🏛️ **A Visit to the National Museum in Cardiff**

Recently, I visited the National Museum in Cardiff. Among the many exhibitions, one particular display stood out, a section on the miners’ strike of the 1980s. What caught my attention was a small, but powerful detail: a sign noting that miners remembered the summer of 1984 for its heat. They called it **"strike weather."** No temperatures or graphs were provided, but the memory was vivid — and it was shared by many.

This piqued my curiosity: **Was the summer of 1984 really unusually hot?** Could I use data to better understand this collective experience — not to dismiss it, but to explore what might have made that summer so memorable?

## 🪧 Historical Context: The Miners’ Strike

In March 1984, the National Union of Mineworkers (NUM) began a nationwide strike against coal pit closures. For over a year, tensions flared across the UK. In Wales, a mining heartland, the effects were deeply felt.

![Photographs from the miners’ strike 1984 – 85](https://monovisions.com/wp-content/uploads/2024/02/one-year-photographs-from-the-miners-strike-1984-85-002-1024x630.jpg) 

*Source: https://monovisions.com/*


<iframe src="/Projects/code/miners-strike/_output/map_with_popups.html" width="100%" height="600" style="border: none;"></iframe>


### The Importance of Coal Mining in 1984

In 1984, coal mining was vital to many UK communities. It wasn’t just a job; it was the economic and cultural heart of many cities. 

1. **Jobs** – Mining was the main source of employment in these areas.
2. **Community** – It was a way of life, with families often working in mines for generations.
3. **The Strike** – The miners weren’t just fighting for wages—they were fighting to save their jobs and towns from pit closures.

Read "[Coal mining created a culture](https://www.bbc.co.uk/future/article/20240703-coal-mining-created-community-and-culture-can-clean-energy-do-the-same)" to learn more about how coal shaped lives.

> "...over 80 per cent of British miners [are] out on strike fighting for the survival of our industry, our pits, jobs and communities. We are fighting in defence of our communities for the right to work-and for our dignity and self-respect." — Arthur Scargill – 1984 [NUM Conference Speech](https://www.ukpol.co.uk/arthur-scargill-1984-num-conference-speech/).

---
## 🌡️ **So...Was 1984 a Hot Summer?**

To answer this question, I delved into data from the **UK Met Office**. Although the inspiration came from Cardiff, the miners’ strike was a nationwide event, with key demonstrations and clashes occurring in mining communities across the UK — especially in regions like South Yorkshire and Lincolnshire. To reflect this broader geography, I examined historical weather data for **Sheffield**, **Waddington**, and **Cardiff**, using publicly available monthly records from the UK Met Office.

<iframe src="/Projects/code/miners-strike/_output/met_office_table.html" width="100%" height="500" style="border: none;"></iframe>


The plot below shows the **maximum temperatures (Tmax)** during the summer months of June, July, and August over multiple years. **1984** stands out as a notably warm summer. You can see the interactive plot below:

<iframe src="/Projects/code/miners-strike/_output/max_summer_temperature_by_station.html" width="100%" height="500" style="border: none;"></iframe>


## ☀️🌧️ **Sunshine and Rainfall — Feeling the Heat Differently**

To deepen my exploration, I also examined **sunshine hours** and **rainfall** for the summer of 1984. A summer with fewer rainy days and more sunshine might point to a **drier, more oppressive heat**.

These interactive plots will help visualize the **total rainfall** and **total sunshine** during summer 1984 in comparison to other years. From these charts, you can see that 1984 was **drier and sunnier** than many other years.

*<mark style="background: #BBFABBA6;">Remember that the charts are interactive — you can zoom in to specific parts by selecting an area, or, turn on-off some station data from the legend.</mark>*

<iframe src="/Projects/code/miners-strike/_output/total_summer_rainfall_by_station.html" width="100%" height="600" style="border: none;"></iframe>

<iframe src="/Projects/code/miners-strike/_output/total_summer_sunshine_by_station.html" width="100%" height="600" style="border: none;"></iframe>


---

## 🌞 **How Unusual Was Summer 1984? 🔥**

This section dives into how **unusual** the summer of 1984 was compared to other years, using **z-scores**. Z-scores provide a measure of how far a particular value is from the mean of a baseline period. I used the baseline years **1977–2006** because.

### 🔍 Z-Scores: The Weather Weirdness Detector

Think of **z-scores** like a "weirdness meter" for weather. They tell us how strange, how unusual a data is compared to the average of a baseline period.  A **baseline period** refers to a specific range of years used as a reference point for understanding what is considered "normal" weather. When we look at weather data, we compare the conditions of a particular year (like 1984) to the average conditions of this baseline period to determine how unusual or extreme the weather was.

#### Why It’s Useful:

- **Standardization**:Compares different years or locations fairly (no unit confusion)
- **Detecting Outliers**: Spots record-breaking, extreme, years instantly

#### 🧭 **Why Use 1977–2006 as a Baseline?**

- ✅ **Standard Climate Period**: This 30-year block is the standard in climate science to define "normal" conditions.
- 🌍 **Pre-Global Warming Surge**: It precedes the rapid global warming that became more noticeable after the late 20th century, making it a stable base.

#### How It Works:

- **Z ≤ -1** → Noticeably cooler or wetter than the baseline (🥶 "Where's my jacket?")  
- **Z ≈ 0** → normal ("Just another summer")
- **Z ≈ +1 to +2** → Noticeably hotter or drier than normal
- **Z ≥ +2** → Extremely hot or dry conditions (🔥 "Wait, is this a heatwave?") 

<iframe src="/Projects/code/miners-strike/_output/Cardiff_summer_1984_vs_climatology.html" width="100%" height="600" style="border: none;"></iframe>

<iframe src="/Projects/code/miners-strike/_output/Sheffield_summer_1984_vs_climatology.html" width="100%" height="600" style="border: none;"></iframe>

<iframe src="/Projects/code/miners-strike/_output/Waddington_summer_1984_vs_climatology.html" width="100%" height="600" style="border: none;"></iframe>


### 📈  Interpreting The Graphs
This scatter plot visualizes the relationship between **temperature** and **rainfall** for each summer. The z-scores of **1984** show how **hot** and **dry** it was compared to other years. The plot's quadrants are divided into four categories based on these z-scores:

| Quadrant         | Temp Z-Score (x-axis) | Rain Z-Score (y-axis) | What It Means                    | Example Interpretation                                 |
| ---------------- | --------------------- | --------------------- | -------------------------------- | ------------------------------------------------------ |
| **Top-right**    | Positive (hot)        | Positive (wet)        | Hotter **and** wetter than usual | Tropical-feeling summer, storms maybe                  |
| **Top-left**     | Negative (cool)       | Positive (wet)        | Cooler **and** wetter than usual | Damp, grey, maybe a washout                            |
| **Bottom-left**  | Negative (cool)       | Negative (dry)        | Cooler **and** drier than usual  | Cold, dry — maybe boring                               |
| **Bottom-right** | Positive (hot)        | Negative (dry)        | Hotter **and** drier than usual  | 🔥 **1984's location**. Heatwave or drought conditions |

---

### 🧐 Interpreting The Results 
<mark style="background: #FFF3A3A6;">UK Summer 1984 — A Subtle but Noticeable Shift</mark>

The below results are created using ±0.5 thresholding of z-scores instead of ±1, which is the norm in climatology. This is to help us uncover **subtle shifts** in climate patterns that people actually felt. 

📍 Station: Cardiff
>🌡️ Temperature z-score: 0.90 → 🟡 Slightly above average
🌧️ Rainfall z-score: -1.08 → 🟠 Below normal
☀️ Sunshine z-score: 1.67 → 🔴 Significantly above normal

📍 Station: Sheffield
>🌡️ Temperature z-score: 0.45 → 🟢 Close to normal
🌧️ Rainfall z-score: -0.49 → 🟢 Close to normal
☀️ Sunshine z-score: 1.09 → 🟠 Above normal

📍 Station: Waddington
>🌡️ Temperature z-score: 0.28 → 🟢 Close to normal
🌧️ Rainfall z-score: -0.52 → 🟡 Slightly below average
☀️ Sunshine z-score: 0.99 → 🟡 Slightly above average

The summer of 1984 wasn’t a dramatic anomaly in the UK climate record. There were no record-breaking heatwaves or catastrophic droughts, but it was still noticeably different from the norm.

Put together, these patterns suggest that the **summer of 1984 leaned toward the warm and dry end of "normal"** — not enough to be called extreme, but enough to potentially **stick in people’s memories** as a brighter and warmer season.

While the temperature, precipitation and sunshine data offer useful signals, **they don’t tell the full story of how summer actually *felt***. Factors like:

- **Humidity** (which affects how sticky warmth feels)
- **Wind** (which can cool things down)

…all play a role in shaping human experience. Without those, we’re reading only part of the atmosphere’s diary.

---
## 🌍 **Climate Change**

While the summer of 1984 wasn't a record-breaking heatwave, it still highlights how **unusually warm conditions** can become etched in collective memory. This wasn’t an isolated event — **extreme weather events** have always been part of our climate. But as the effects of **global warming** become more pronounced, conditions like those in 1984 may become more frequent and intense.

What was once an outlier, a summer with **above-average heat and dry conditions**, may increasingly reflect the kinds of weather patterns we can expect in the future. As global temperatures rise, summers like 1984’s could become more common, leading to **longer, hotter seasons** and more frequent periods of drought.

> "The world is moving towards a 'new climate frontier' with temperatures higher than at any point over the past million years, bringing impacts such as stronger storms, heatwaves, and droughts." — Dr. James Hansen, climate scientist ([The Guardian, 2023](https://www.theguardian.com/environment/2023/jul/19/climate-crisis-james-hansen-scientist-warning))

- - -
## 🎤 Conclusion

This exploration doesn’t seek to **quantify** the miners' experiences but to give us a deeper understanding of their collective memory of the summer of 1984. It wasn’t just a hot summer — it was a time when weather became part of the **social and political fabric** of their protest.

By using data, we’ve confirmed that 1984 was indeed **hotter and sunnier** than average, especially in June and July. But memory doesn’t always store numbers; it stores **feelings, experiences**, and **emotions** — and this is where data helps **clarify** and **reinforce** the lived experience.

#DataScience #Climate #History #MinersStrike #WeatherAnalysis #ClimateChange


