docker image pull redislabs/redismod

docker run \
  -p 6379:6379 \
  -v `pwd`/data:/data \
  redislabs/redismod \
  --requirepass foobared \
  --loadmodule /usr/lib/redis/modules/redisai.so \
    ONNX redisai_onnxruntime/redisai_onnxruntime.so \
    TF redisai_tensorflow/redisai_tensorflow.so \
    TFLITE redisai_tflite/redisai_tflite.so \
    TORCH redisai_torch/redisai_torch.so \
  --dir /data \
