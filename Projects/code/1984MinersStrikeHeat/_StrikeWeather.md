tags: code

[[Projects/code/1984MinersStrikeHeat/_photos/strikeweather.jpg]]
# 🪨 Strike Weather: A Data Journey into Summer 1984

## 🏛️ **A Visit to the National Museum in Cardiff**

Recently, I visited the National Museum in Cardiff. Among the many exhibitions, one particular display stood out, a section on the miners’ strike of the 1980s. What caught my attention was a small, but powerful detail: a sign noting that miners remembered the summer of 1984 for its heat. They called it **"strike weather."** No temperatures or graphs were provided, but the memory was vivid — and it was shared by many.

This piqued my curiosity: **Was the summer of 1984 really unusually hot?** Could I use data to better understand this collective experience — not to dismiss it, but to explore what might have made that summer so memorable?

## 🪧 Historical Context: The Miners’ Strike

In March 1984, the National Union of Mineworkers (NUM) began a nationwide strike against coal pit closures. For over a year, tensions flared across the UK. In Wales, a mining heartland, the effects were deeply felt.

![Photographs from the miners’ strike 1984 – 85](https://monovisions.com/wp-content/uploads/2024/02/one-year-photographs-from-the-miners-strike-1984-85-002-1024x630.jpg) 

*Source: https://monovisions.com/*

### The Importance of Coal Mining in 1984

In 1984, coal mining was vital to many UK communities. It wasn’t just a job; it was the economic and cultural heart of many cities. 

1. **Economic Backbone**: Coal mining provided the primary source of employment.
    
2. **Cultural Significance**: Mining was a deeply ingrained tradition, passed down through generations, forming the backbone of community identity.
    
3. **The Fight for Survival**: The miners’ strike was about more than pay—it was a battle to preserve jobs, communities, and a way of life threatened by pit closures.

Read "[Coal mining created a culture](https://www.bbc.co.uk/future/article/20240703-coal-mining-created-community-and-culture-can-clean-energy-do-the-same)" to learn more about how coal shaped lives.

> "...over 80 per cent of British miners [are] out on strike fighting for the survival of our industry, our pits, jobs and communities. We are fighting in defence of our communities for the right to work-and for our dignity and self-respect." — Arthur Scargill – 1984 [NUM Conference Speech](https://www.ukpol.co.uk/arthur-scargill-1984-num-conference-speech/).

---
## 🌡️ **So...Was 1984 a Hot Summer?**

To answer this question, I delved into data from the **UK Met Office**. Although the inspiration came from Cardiff, the miners’ strike was a nationwide event, with key demonstrations and clashes occurring in mining communities across the UK — especially in regions like South Yorkshire and Lincolnshire. To reflect this broader geography, I examined historical weather data for **Sheffield**, **Waddington**, and **Cardiff**, using publicly available monthly records from the UK Met Office.

<iframe src="/Projects/code/1984MinersStrikeHeat/_output/met_office_table.html" width="100%" height="500" frameborder="0"></iframe>

Testing
```dataviewjs
const iframeHtml = `<iframe src="/Projects/code/1984MinersStrikeHeat/_output/met_office_table.html" width="100%" height="500" frameborder="0"></ifram e>`;
const div = dv.el('div', '');
div.innerHTML = iframeHtml;
```


The plot below shows the **maximum temperatures (Tmax)** during the summer months of June, July, and August over multiple years. **1984** stands out as a notably warm summer. You can see the interactive plot below:
<iframe src="/Projects/code/1984MinersStrikeHeat/_output/max_summer_temperature_by_station.html" width="100%" height="500" frameborder="0"></iframe>
<iframe src="_output/max_summer_temperature_by_station" width="100%" height="500" frameborder="0"></iframe>

## ☀️🌧️ **Sunshine and Rainfall — Feeling the Heat Differently**

To deepen my exploration, I also examined **sunshine hours** and **rainfall** for the summer of 1984. A summer with fewer rainy days and more sunshine might point to a **drier, more oppressive heat**. Here's what the data says:
These interactive plots will help visualize the **total rainfall** and **total sunshine** during summer 1984 in comparison to other years. From these charts, you can see that 1984 was **drier and sunnier** than many other years.

*<mark style="background: #BBFABBA6;">Remember that the charts are interactive — you can zoom in to specific parts by selecting an area, or, turn on-off some station data from the legend.</mark>*


<iframe src="/Projects/code/1984MinersStrikeHeat/_output/total_summer_rainfall_by_station.html" width="100%" height="500" frameborder="0"></iframe>

<iframe src="_output/total_summer_sunshine_by_station" width="100%" height="500" frameborder="0"></iframe>

---

## 🌞 **How Unusual Was Summer 1984? 🔥**

This section dives into how **unusual** the summer of 1984 was compared to other years, using **z-scores**. Z-scores provide a measure of how far a particular value is from the mean of a baseline period. I used the baseline years **1977–2006** because.

### Method & Interpretation of z-scores

#### Why Use z-scores?
Z-scores help measure how unusual a value (like the summer of 1984) is compared to the average of a baseline period (1977–2006).

- **Relative Comparison**: A z-score shows how far a value is from the mean. A positive z-score means it’s above average, while a negative one means it’s below average.
    
- **Standardization**: Z-scores allow us to compare temperatures across different years or locations without worrying about units.
    
- **Detecting Outliers**: Z-scores highlight extreme years. A high z-score means a year was unusually hot or cold.

#### 🧭 **Why Use 1977–2006 as a Baseline?**

- ✅ **Standard Climate Period**: This 30-year block is the standard in climate science to define "normal" conditions.
    
- 🌍 **Pre-Global Warming Surge**: It precedes the rapid global warming that became more noticeable after the late 20th century, making it a stable base.

<iframe src="/Projects/code/1984MinersStrikeHeat/_output/Cardiff_summer_1984_vs_climatology.html" width="100%" height="500" frameborder="0"></iframe>
<iframe src="/Projects/code/1984MinersStrikeHeat/_output/Sheffield_summer_1984_vs_climatology.html" width="100%" height="500" frameborder="0"></iframe>
<iframe src="/Projects/code/1984MinersStrikeHeat/_output/Waddington_summer_1984_vs_climatology.html" width="100%" height="500" frameborder="0"></iframe>
### 📈 **What This Plot Shows**

This scatter plot visualizes the relationship between **temperature** and **rainfall** for each summer from 1883 onward. The z-scores of **1984** show how **hot** and **dry** it was compared to other years.

- **X-axis**: Z-score for mean summer temperature (how hot/cool it was compared to 1977–2006 average)
    
- **Y-axis**: Z-score for total summer rainfall (how wet/dry it was compared to same average)
    

### 🧪 **How to Read the Z-scores:**

- **Z ≈ 0** → The summer was normal.
    
- **Z ≈ +1 to +2** → Noticeably hotter or drier than normal.
    
- **Z ≥ +2** → Extremely hot or dry conditions.
    
- **Z ≤ -1** → Cooler or wetter than the baseline.
    

The plot's quadrants are divided into four categories based on these z-scores:

| Quadrant         | Temp Z-Score (x-axis) | Rain Z-Score (y-axis) | What It Means                    | Example Interpretation                                 |
| ---------------- | --------------------- | --------------------- | -------------------------------- | ------------------------------------------------------ |
| **Top-right**    | Positive (hot)        | Positive (wet)        | Hotter **and** wetter than usual | Tropical-feeling summer, storms maybe                  |
| **Top-left**     | Negative (cool)       | Positive (wet)        | Cooler **and** wetter than usual | Damp, grey, maybe a washout                            |
| **Bottom-left**  | Negative (cool)       | Negative (dry)        | Cooler **and** drier than usual  | Cold, dry — maybe boring                               |
| **Bottom-right** | Positive (hot)        | Negative (dry)        | Hotter **and** drier than usual  | 🔥 **1984's location**. Heatwave or drought conditions |

---

### 🧐 **Interpreting Summer 1984**

1984 clearly lands in the **bottom-right corner for all stations**

Cardiff: 
- Temperature z-score: 0.90 → 🟡 Slightly above average 
- Rainfall z-score: -1.08 → 🟠 Below normal 
- Sunshine z-score: 1.67 → 🔴 Significantly above normal
In Cardiff, the temperature is slightly above average, while rainfall is notably below normal. However, sunshine levels are significantly above normal.

Sheffield: 
- Temperature z-score: 0.45 → 🟢 Close to normal 
- Rainfall z-score: -0.49 → 🟢 Close to normal 
- Sunshine z-score: 1.09 → 🟠 Above normal 
In Sheffield, both temperature and rainfall are close to normal, with sunshine being slightly above average.

Waddington: 
- Temperature z-score: 0.28 → 🟢 Close to normal 
- Rainfall z-score: -0.52 → 🟡 Slightly below average 
- Sunshine z-score: 0.99 → 🟡 Slightly above average 
In Waddington, the temperature is close to normal, rainfall is slightly below average, and sunshine is slightly above average.

Overall, the weather patterns vary across the locations, with Cardiff experiencing more extreme variations in rainfall and sunshine, while Sheffield and Waddington have more moderate deviations.

---
## 🌍 **Climate Change**

While the summer of 1984 wasn't a record-breaking heatwave, it stands as a reminder that **extreme weather events** have always been a part of our climate. However, with the influence of **global warming**, such conditions are becoming more frequent and intense. What was once an unusually warm summer is now becoming an indicator of the kinds of weather patterns we may see more of in the future.

As global temperatures rise, summers like 1984 — characterized by **above-average heat and dry conditions** — may become more common. It's a glimpse into how **climate change** could lead to longer, hotter summers, and more frequent periods of drought.

> "The world is moving towards a 'new climate frontier' with temperatures higher than at any point over the past million years, bringing impacts such as stronger storms, heatwaves, and droughts." — Dr. James Hansen, climate scientist ([The Guardian, 2023](https://www.theguardian.com/environment/2023/jul/19/climate-crisis-james-hansen-scientist-warning))

- - -
## 🎤 Conclusion

This exploration doesn’t seek to **quantify** the miners' experiences but to give us a deeper understanding of their collective memory of the summer of 1984. It wasn’t just a hot summer — it was a time when weather became part of the **social and political fabric** of their protest.

By using data, we’ve confirmed that 1984 was indeed **hotter and sunnier** than average, especially in June and July. But memory doesn’t always store numbers; it stores **feelings, experiences**, and **emotions** — and this is where data helps **clarify** and **reinforce** the lived experience.

## 💬 Takeaway

The summer of 1984 is a striking example of how weather, politics, and people intersect. It wasn’t just the social climate that was heating up. Understanding these historical moments through data helps us see patterns — and what might lie ahead.
