import os
import urllib.parse
import feedparser
from datetime import datetime, timedelta

VAULT_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

QUERIES = {
    "Competidores Nacionais": '"Growth Supplements" OR "Integralmedica" OR "DUX Nutrition" OR "Max Titanium" OR "Atlhetica Nutrition" OR "Atomic Labs"',
    "Regulação (ANVISA & OMS)": '("ANVISA" OR "Agência Nacional de Vigilância Sanitária" OR "World Health Organization" OR "WHO" OR "OMS") AND (suplementos OR esporte OR nutrição OR whey OR creatina)',
    "Ciência e Nutrição Esportiva": '("PubMed" OR "ISSN" OR "International Society of Sports Nutrition") AND ("sports supplements" OR "whey protein" OR creatine OR "Beta-Alanine" OR "Sports Nutrition")'
}

CANONICAL_BRAND_MAPPING = {
    "growth": "[[Research/competitors/growth-supplements|Growth Supplements]]",
    "integralmedica": "[[Research/competitors/integralmedica|Integralmedica]]",
    "dux": "[[Research/competitors/dux-human-health|DUX Human Health]]",
    "max titanium": "[[Research/competitors/max-titanium|Max Titanium]]",
    "atlhetica": "[[Research/competitors/atlhetica-nutrition|Atlhetica Nutrition]]",
    "atomic labs": "[[Research/competitors/atomic-labs|Atomic Labs]]",
}

def get_news(query):
    encoded_query = urllib.parse.quote_plus(query)
    rss_url = f"https://news.google.com/rss/search?q={encoded_query}&hl=pt-BR&gl=BR&ceid=BR:pt-419"
    feed = feedparser.parse(rss_url)
    
    recent_entries = []
    now = datetime.now()
    time_window = now - timedelta(days=7) # Window expanded to 7 days for testing content guarantees
    
    for entry in feed.entries:
        try:
            # Typical format: 'Mon, 20 Apr 2026 15:30:00 GMT'
            pub_date = datetime.strptime(entry.published, "%a, %d %b %Y %H:%M:%S %Z")
            if pub_date >= time_window:
                recent_entries.append(entry)
        except Exception:
            recent_entries.append(entry)
            
    # Sort by descending published date
    recent_entries.sort(key=lambda x: x.published_parsed if getattr(x, 'published_parsed', None) else 0, reverse=True)
    return recent_entries[:15] # Target Top 15

def create_report():
    today_str = datetime.now().strftime("%Y-%m-%d")
    report_filename = f"{today_str}-daily-intel.md"
    
    inbox_dir = os.path.join(VAULT_PATH, "Inbox", "reports")
    os.makedirs(inbox_dir, exist_ok=True)
    
    report_path = os.path.join(inbox_dir, report_filename)
    
    lines = [
        "---",
        f'name: "Daily Intel Tracker — {today_str}"',
        'description: "Coleta automática de notícias de competidores, reguladores (ANVISA/OMS) e ciência esportiva."',
        'type: intel-report',
        'status: active',
        f'date: {today_str}',
        'tags: [research, competitive-analysis, intel, report, automation]',
        '---',
        '',
        f'# Daily Intel Tracker — {today_str}',
        '',
        '> [!info] Fonte',
        '> Este relatório foi gerado automaticamente agregando dados recentes de Competidores, ANVISA, OMS, PubMed e ISSN.',
        ''
    ]
    
    for category, query in QUERIES.items():
        lines.append(f'## {category}')
        entries = get_news(query)
        if not entries:
            lines.append("*Nenhuma novidade relevante detectada no período recente.*")
        else:
            for entry in entries:
                mentions = []
                # Simple keyword lookup to add Graph Links
                for key, wikilink in CANONICAL_BRAND_MAPPING.items():
                    if key in entry.title.lower():
                        mentions.append(wikilink)
                
                mention_str = f" **(Mentions: {', '.join(mentions)})**" if mentions else ""
                lines.append(f"- [{entry.title}]({entry.link}){mention_str}")
                
                # Check for explicit ANVISA / OMS / WHO hits to add tags
                if "anvisa" in entry.title.lower():
                    lines[-1] += " `#anvisa`"
                if "oms" in entry.title.lower() or "world health" in entry.title.lower() or "who" in entry.title.lower():
                    lines[-1] += " `#oms` `#who`"
                    
        lines.append('')
        
    with open(report_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
        
    print(f"Report generated successfully at: {report_path}")

if __name__ == "__main__":
    create_report()
