# Osaka AI Culture Expo – Corporate Guide

静的サイト一式です。`index.html` と `assets/` 配下のみで完結します。

## ローカル確認

```bash
# ルートで
python3 -m http.server 8080
# http://localhost:8080 で確認
```

## デプロイ方針
- GitHub: メインブランチを `main`
- Vercel: フロントのみ（ビルドなし）
- ドメイン: `corporateguid.tokiwavalley.com` を Cloudflare で CNAME → Vercel

## 必要なシークレット（私からは取得・決済不可）
- GitHub: PAT (repo 権限) もしくは SSH キー設定
- Vercel: Personal Access Token + Team/スコープ名
- Cloudflare: Zone ID + API Token(DNS edit) for `tokiwavalley.com`

## この後の実行ステップ（コピペ可）
1) GitHub リポジトリ作成後、リモート追加＆初回プッシュ
```bash
REMOTE=git@github.com:<owner>/<repo>.git  # もしくは https://github.com/<owner>/<repo>.git
git branch -M main
git remote add origin "$REMOTE"
git add .
git commit -m "chore: init site"
git push -u origin main
```

2) Vercel プロジェクト作成（静的配信）
```bash
# 環境変数: VERCEL_TOKEN, VERCEL_ORG_ID or --scope
vercel --token $VERCEL_TOKEN --scope <team> init . --name corporateguid
vercel --token $VERCEL_TOKEN --scope <team> --prod --confirm --cwd .
```

3) カスタムドメイン紐付け（Cloudflare 側で CNAME 設定）
```bash
# Vercel にドメイン登録
vercel domains add corporateguid.tokiwavalley.com --token $VERCEL_TOKEN --scope <team>

# Cloudflare API で CNAME を設定（proxied false 推奨）
# 以下は例: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ZONE_ID を export 済みとする
curl -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"type":"CNAME","name":"corporateguid","content":"cname.vercel-dns.com","ttl":120,"proxied":false}'
```

4) Vercel 側の所有確認が必要な場合、指示された TXT を Cloudflare に追加してください。

## 備考
- ビルド不要なので Vercel の Framework 設定は "Other" / Output Directory "" / Build Command "" / Install Command "" で OK。
- `assets/main.js` でハードリロードなく動作する前提です。
