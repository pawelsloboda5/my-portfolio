export const blogPosts = [
  {
    slug: 'marketbump-lessons',
    title: 'Building MarketBump.io – Lessons Learned',
    date: '2025-05-08',
    content: `# Building MarketBump.io – Lessons Learned

**TL;DR**: MarketBump.io went from a weekend proof-of-concept to a production system consuming **100k+** news articles a day, all on a shoestring budget. In this retrospective I share the good, the ugly and the _graph-query that almost bankrupted me_.

---

## 1. How It Started

In May '23 I found myself juggling twenty browser tabs trying to understand why my portfolio tanked overnight. Existing dashboards either blasted me with fire-hose feeds or spoon-fed generic newsletters. I wanted something lean that:

1. Knew the *tickers I truly cared about*.
2. Mixed fundamentals with the social context of Reddit & Twitter.
3. Responded in **< 300 ms** because latency ≠ patience.

So I opened VS Code, typed \`npm create vite@latest marketbump\`, poured coffee and pressed _play_…

---

## 2. Architecture At A Glance

~~~mermaid
flowchart TD
  browser((Next.js Frontend)) --> |REST + WebSockets| api[(Flask API)]
  api --> |Aggregated queries| mongo[(MongoDB Cluster)]
  api --> |News Ingest| polygon[Polygon.io]
  browser <-->|SSR| next[Next.js Server]
~~~

Why Flask over FastAPI? Familiarity and a pre-baked auth middleware from an earlier project that saved me two weekends. The entire stack ships as three containers on Vercel + MongoDB Atlas.

---

## 3. The MongoDB Vector HNSW Hack

Articles rarely mention tickers explicitly. To surface _semantically similar_ content I embedded headlines with **MiniLM-L6** and stored vectors in Atlas Vector Search.

~~~python
from sentence_transformers import SentenceTransformer
from pymongo import MongoClient

model  = SentenceTransformer('all-MiniLM-L6-v2')
client = MongoClient(os.getenv('MONGO_URI'))

def store(headline):
    vec = model.encode(headline).tolist()
    client.db.articles.insert_one({'headline': headline, 'vector': vec})
~~~

Average ANN lookup: **14 ms**. Click-through on those recs jumped **27 %**.

---

## 4. Performance Land-Mines & Fixes

| Bottleneck                 | Symptom          | Fix                                   | Result          |
|----------------------------|------------------|---------------------------------------|-----------------|
| N+1 portfolio queries      | 1200 ms latency  | Aggregated $in query + index on code | 1200 → 85 ms    |
| 5 MB JSON payloads         | 5× data budget   | Gzip + selective projection           | 80 % smaller    |
| Cold Lambda starts (Vercel)| 2 s spikes       | Edge caching                          | p99 260 ms      |

---

## 5. CI/CD – Shipping In Minutes

* GitHub Actions lint + unit-tests (Jest).
* Preview deployment on every PR.
* Smoke-test suite using a **5 GB anonymised dump**.

Median commit-to-prod: **5 min 42 s**. The dopamine loop is real.

---

## 6. What Went Wrong

* Forgot to throttle Polygon API – **$250 overage** 😅.
* Initial cron tried to digest _all historical news_ – 9 h downtime.
* Assumed Redis persistence on Vercel – _spoiler_: it's ephemeral.

---

## 7. Roadmap

1. RAG summarisation for long-form reports.
2. Edge TPU inference for _mobile push highlights_.
3. Community plugin system (think **Zapier, but stocks**).

---

Thanks for reading! Feedback? Ping me on [LinkedIn](https://www.linkedin.com/in/pawel-sloboda-383181216/).`
  },
  {
    slug: 'yolo-player-detection',
    title: 'Fine-tuning YOLO for Real-time Player Detection',
    date: '2025-05-08',
    content: `# Fine-tuning YOLO for Real-time Player Detection

Achieving 30 FPS object detection on consumer GPUs isn't easy – especially when every dropped frame can mean virtual death. Here's the diary of squeezing the last milliseconds out of **YOLOv8**.

---

## Dataset

* **23 k** annotated frames (CVAT semi-auto polygons).
* Class imbalance (1:3) mitigated with **Mosaic Augmentation**.
* Heavy motion blur ⟶ added synthetic blur augmentation.

---

## Training Pipeline

1. **Warm-start** from COCO weights – transfer learning saves compute.
2. **Distillation** ➜ ONNX **dynamic shapes**.
3. **Pruning** 15 % channels – no mAP loss.
4. Mixed-precision (FP16) + gradient accumulation.

~~~bash
yolo detect train data=dataset.yaml model=yolov8s.pt imgsz=1280 device=0 epochs=237
~~~

---

## Rust + OpenCV Inference Engine

Python maxed at 45 FPS. A tiny Rust bridge to OpenCV + ONNX Runtime pushed that to **84 FPS**.

~~~rust
let session = SessionBuilder::new()?.with_model_from_file("yolov8s.onnx")?;
let input   = ndarray::Array::from_shape_vec((1, 3, H, W), pixels)?;
let output  = session.run(vec![input.into()])?;
~~~

Latency per frame: **11 ms** (GTX 1650).

---

## Non-Max Suppression Tweaks

* Dynamic IoU threshold based on **object-area quartiles**.
* Soft-NMS for clustered scenes ⟶ ↓ false positives 18 %.

---

## Results (GTX 1650)

| Metric  | Value |
|---------|-------|
| mAP@50  | 0.93  |
| Precision | 0.95 |
| Recall | 0.88 |
| FPS | 30 |

---

## Continuous Deployment To OBS Studio Plugin

A small C++ wrapper converts the Rust library into a **DLL** consumable by OBS. Streamers download → drop into plugins folder → instant in-game overlays.

---

## Lessons Learned

* _Measure first_ – half my "optimisations" added latency.
* RGB ➜ BGR conversion in-place saved **4 ms**.
* Embedding compile-time constants with \`const fn\` is free perf.

---

### Roadmap

* Edge TPU build for handheld devices.
* Experiment with **DETR v3** for multi-class support.
* Community dataset contributions – PRs welcome!

---

Questions? Drop an issue on [GitHub](https://github.com/pawelsloboda5/player-detection).`
  }
]; 