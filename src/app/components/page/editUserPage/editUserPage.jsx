import React, { useEffect } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import history from "../../../utils/history";

import FieldText from "../../common/form/fieldText";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

import { validator } from "../../../utils/validator";

import BackHistoryButton from "../../common/backButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getQualitiesList,
  getQualitiesLoading,
} from "../../../store/qualities";
import {
  getProfessionsList,
  getProfessionsLoading,
} from "../../../store/profession";
import {
  getCurrentUser,
  getCurrentUserData,
  updateUser,
} from "../../../store/users";

const EditUserPage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useStateIfMounted();
  const [isLoading, setIsLoading] = useStateIfMounted(true);

  const professionLoading = useSelector(getProfessionsLoading());
  const professions = useSelector(getProfessionsList());

  const qualities = useSelector(getQualitiesList());
  const qualityLoading = useSelector(getQualitiesLoading());

  const [errors, setErrors] = useStateIfMounted({});

  const currentUser = useSelector(getCurrentUserData());
  const currentUserId = useSelector(getCurrentUser());

  const transformData = (data) => {
    if (data.length !== 0) {
      return data.map((qual) => ({ label: qual.name, value: qual._id }));
    } else {
      return [];
    }
  };

  useEffect(() => {
    const getQuality = (id) => {
      return qualities.find((q) => q._id === id);
    };

    if (!professionLoading && !qualityLoading && currentUser && !data) {
      setData(() => ({
        ...currentUser,
        qualities: transformData(
          currentUser.qualities
            ? currentUser.qualities.map((q) => getQuality(q))
            : []
        ),
      }));
    }
  }, [professionLoading, qualityLoading, currentUser, data]);

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false);
    }
  }, [data]);

  //validation
  const validatorConfig = {
    name: {
      isRequired: { message: "Name is required!" },
      min: {
        message: "Name must contain at least 3 symbols!",
        value: 3,
      },
    },
    email: {
      isRequired: { message: "Email is required!" },
      isEmail: { message: "Email is not correct!" },
    },
  };

  useEffect(() => validate(), [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const qualy in qualities) {
        if (elem.value === qualities[qualy]._id) {
          qualitiesArray.push(qualities[qualy]._id);
        }
      }
    }
    return qualitiesArray;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(updateUser({ ...data, qualities: getQualities(data.qualities) }));
    history.push(`/users/${currentUserId}`);
  };

  return (
    <div className="container mt-5 ">
      <BackHistoryButton />
      <div className="row ">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading &&
          Object.keys(professions).length > 0 &&
          qualities.length > 0 ? (
            <form onSubmit={handleSubmit}>
              <FieldText
                label="Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                autoComplete=""
                error={errors.name}
              />
              <FieldText
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                autoComplete=""
                error={errors.email}
              />
              <SelectField
                label="Choose your profession"
                name="profession"
                onChange={handleChange}
                value={data.profession}
                defaultOption="Choose..."
                items={professions}
                error={errors.profession}
              />
              <RadioField
                name="sex"
                onChange={handleChange}
                value={data.sex}
                items={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                  { name: "Other", value: "other" },
                ]}
                label="Choose your sex"
              />
              <MultiSelectField
                onChange={handleChange}
                items={transformData(qualities)}
                label="Choose qualities"
                name="qualities"
                defaultValue={data.qualities}
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto">
                Обновить
              </button>
            </form>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
