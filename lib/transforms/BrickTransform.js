function BrickTransform(transformGenerator) {
    let directTransform;
    let inverseTransform;

    this.getTransformParameters = () => {
        return directTransform ? directTransform.transformParameters : undefined;
    };

    this.applyDirectTransform = (data, transformParameters, callback) => {
        if (!directTransform) {
            transformGenerator.createDirectTransform(transformParameters, (err, _directTransform) => {
                if (err) {
                    return callback(err);
                }

                if (typeof _directTransform === "undefined") {
                    return callback();
                }

                directTransform = _directTransform;
                directTransform.transform(data, callback);
            });
        } else {
            directTransform.transform(data, callback);
        }
    };

    this.applyInverseTransform = (data, transformParameters, callback) => {
        if (!inverseTransform) {
            return transformGenerator.createInverseTransform(transformParameters, (err, _inverseTransform) => {
                if (err) {
                    return callback(err);
                }

                inverseTransform = _inverseTransform;
                inverseTransform.transform(data, callback);
            });
        }

        inverseTransform.transform(data, callback);
    };
}

module.exports = BrickTransform;

