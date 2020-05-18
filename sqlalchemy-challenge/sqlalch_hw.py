import numpy as np
import pandas as pd

import datetime as dt

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
from sqlalchemy import desc
engine = create_engine("sqlite:///Resources/hawaii.sqlite")

Base = automap_base()

Base.prepare(engine, reflect=True)

Station = Base.classes.station
Measurement = Base.classes.measurement

app = Flask(__name__)

#     * `/`
#   * Home page.
#   * List all routes that are available.
@app.route("/")
def home():
    """List of all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/<start><br/>"
        f"/api/v1.0/<start>/<end>"
    )

# * `/api/v1.0/precipitation`
#   * Convert the query results to a dictionary using `date` as the key and `prcp` as the value.
#   * Return the JSON representation of your dictionary.

@app.route("/api/v1.0/precipitation")
def precipitation():
    session = Session(bind=engine)
    prcp_q = session.query(Measurement.date, func.sum(Measurement.prcp)).filter(func.strftime(Measurement.date) >= '20160823').group_by(Measurement.date).all()
    
    session.close()
    
    prcp_ls = list(np.ravel(prcp_q))
    
    return jsonify(prcp_ls)


# * `/api/v1.0/stations`
#   * Return a JSON list of stations from the dataset.

@app.route("/api/v1.0/stations")
def stations():
    session = Session(bind=engine)
    freq_q = session.query(Measurement.station, func.count(Measurement.station)).group_by(Measurement.station).order_by(desc(func.count(Measurement.station))).all()
    
    session.close()
    
    freq_ls = list(np.ravel(freq_q))
    
    return jsonify(freq_ls)

# * `/api/v1.0/tobs`
#   * Query the dates and temperature observations of the most active station for the last year of data.
#   * Return a JSON list of temperature observations (TOBS) for the previous year.

@app.route("/api/v1.0/tobs")
def tobs():
    session = Session(bind=engine)
    
    sel3 = [Measurement.date,
       Measurement.tobs,
       Measurement.station]
    
    act_hst = session.query(*sel3).\
    filter(Measurement.station == 'USC00519281', func.strftime(Measurement.date) >= '20160823').\
    group_by(Measurement.date).\
    order_by(Measurement.date).all()

    session.close()
    
    act_ls = list(np.ravel(act_hst))
    
    return jsonify(act_ls)


# * `/api/v1.0/<start>` and `/api/v1.0/<start>/<end>`
#   * Return a JSON list of the minimum temperature, the average temperature, and the max temperature for a given start or start-end range.
#   * When given the start only, calculate `TMIN`, `TAVG`, and `TMAX` for all dates greater than and equal to the start date.

#   * When given the start and the end date, calculate the `TMIN`, `TAVG`, and `TMAX` for dates between the start and end date inclusive.


if __name__ == "__main__":
    app.run(debug=True)







