gcloud functions deploy helloHttp --runtime nodejs8 --trigger-http --project $GC_PROJECT
gcloud functions deploy createAuthor --runtime nodejs8 --trigger-http --project $GC_PROJECT
gcloud functions deploy createPost --runtime nodejs8 --trigger-http --project $GC_PROJECT