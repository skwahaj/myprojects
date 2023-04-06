import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  BaseComponent,
  i18n,
  dataTable,
  actionsCommon,
  ExecuteArgs,
  actionsSchool,
  commonSchoolConfig,
  commonConfig,
  commonAssessmentConfig,
  actions,
  sessionStore,
  Validation,
  ConvertDate,
  MarkersCommonSelect,
  convertTimeZone,
  CommonFuncs,
  MarkersDatepicker,
} from "../commonAssessmentIndex";
import { isEqual, uniqBy } from "lodash";
import "./../../../assets/plugins/timepicker/timepicker.css";
import Timepicker from "../../common/component/markersTimepicker";
import MarkersDelete from "../../common/component/markersDeleteComponent";
const dataTableObj = new dataTable();
const tableColumns = [
  {
    name: "assessmentTitle",
    header: "assessment",
    type: "linkContentAssessment",
    linkUrl: "/assessment/assessmentSession",
  },
  { name: "title", header: "title", type: "default" },
  { name: "code", header: "code", type: "default" },
  {
    name: "startDate",
    header: "startDate",
    type: "date",
    format: new sessionStore().returnDateFormat(),
  },
  {
    name: "endDate",
    header: "endDate",
    type: "date",
    format: new sessionStore().returnDateFormat(),
  },
  {
    name: "lookupPublicationStatusTitle",
    header: "publicationStatus",
    type: "default",
  },
  { name: "action", header: "action", type: "buttonWithLink" },
];
const editFunc = "editAdministration";
const deleteFunc = "handleDelete";
const viewFunc = "viewAssessmentAdministration";
const dateFlag = 0;
const timeZoneObj = new convertTimeZone();
const commonFuncObj = new CommonFuncs();
let moment = require("moment");
class AssessmentAdministrationComponent extends BaseComponent {
  initializeFields = {
    assessmentId: null,
    title: "",
    code: "",
    description: "",
    periodIds: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    lookupAssessmentReportingMethod: null,
    lookupPublicationStatus: 9502,
    comment: "",
  };
  constructor(props) {
    super(props);
    this.state = {
      isOpenResult: false,
      fields: { ...this.initializeFields },
      integerFields: [
        "assessmentId",
        "lookupAssessmentReportingMethod",
        "lookupPublicationStatus",
      ],
      requiredFields: [
        { fieldName: "assessmentId", fieldType: "default" },
        {
          fieldName: "description",
          fieldType: "regExpNotRequired",
          regExp: commonConfig.SUBJECT_DESCRIPTION,
        },
        {
          fieldName: "title",
          fieldType: "regExp",
          regExp: commonConfig.FUNDING_PROGRAM,
        },
        {
          fieldName: "code",
          fieldType: "regExp",
          regExp: commonConfig.ASSESSMENT_CODE,
        },
        { fieldName: "periodIds", fieldType: "default" },
        { fieldName: "startDate", fieldType: "default" },
        {
          fieldName: "endDate",
          fieldType: "dateComp",
          associatedField: "startDate",
        },
        {
          fieldName: "endTime",
          fieldType: "timeNotRequired",
          associatedField: "startTime",
        },
        { fieldName: "lookupAssessmentReportingMethod", fieldType: "default" },
        { fieldName: "lookupPublicationStatus", fieldType: "default" },
      ],
      initialRequiredFields: [
        { fieldName: "assessmentId", fieldType: "default" },
        {
          fieldName: "description",
          fieldType: "regExpNotRequired",
          regExp: commonConfig.SUBJECT_DESCRIPTION,
        },
        {
          fieldName: "title",
          fieldType: "regExp",
          regExp: commonConfig.FUNDING_PROGRAM,
        },
        {
          fieldName: "code",
          fieldType: "regExp",
          regExp: commonConfig.ASSESSMENT_CODE,
        },
        { fieldName: "periodIds", fieldType: "default" },
        { fieldName: "startDate", fieldType: "default" },
        {
          fieldName: "endDate",
          fieldType: "dateComp",
          associatedField: "startDate",
        },
        {
          fieldName: "endTime",
          fieldType: "timeNotRequired",
          associatedField: "startTime",
        },
        { fieldName: "lookupAssessmentReportingMethod", fieldType: "default" },
        { fieldName: "lookupPublicationStatus", fieldType: "default" },
        { fieldName: "comment", fieldType: "default" },
      ],
      isError: 0,
      isEdit: 0,
      isView: 0,
      tempStartTime: "",
      tempEndTime: "",
      isAddAdministrationFlag: false,
      deleteId: null,
      dataTableFlag: false,
      selectedOption: [],
      badgeColor: "",
      assessmentAdministrationList: [],
      isReason: false,
      valStatus: null,
      deleteFlag: false,
    };
    this.props.onGetLookup(commonConfig.LOOKUP_ASSESSMENT_REPORTING_METHOD);
    let executedArgument = new ExecuteArgs(
      commonSchoolConfig.COMPONENT_SCHOOL,
      commonSchoolConfig.COMPONENT_SCHOOL_PERIOD_GETALL,
      commonConfig.METHOD_TYPE_POST,
      {
        schoolSessionId: new sessionStore().returnSessionID(),
        inActiveInclude: false,
      }
    );
    this.props.onGetPeriodAllSuccess(executedArgument);
    executedArgument = new ExecuteArgs(
      commonAssessmentConfig.COMPONENT_ASSESSMENT,
      commonAssessmentConfig.COMPONENT_GET_ASSESSMENT_INFO_LIST_BY_SCHOOL_ID +
        new sessionStore().returnSchoolID(),
      commonConfig.METHOD_TYPE_GET
    );
    this.props.onGetAllAssessmentInfoSuccess(executedArgument);
    this.props.onGetLookup(commonConfig.LOOKUP_PUBLICATION_STATUS);
  }
  componentDidMount = () => {
    window
      .$("#addAssessmentAdministrationModal,#titleSchoolSessionModal")
      .modal({
        backdrop: "static",
        keyboard: false,
        show: false,
      });
    this.getAllAdministration();
  };
  addAssesmentAdministration = () => {
    this.setState(
      {
        isAddAdministrationFlag: true,
        isError: 0,
        isComment: false,
        fields: this.initializeFields,
        selectedOption: [],
        tempStartTime: "",
        tempEndTime: "",
        isEdit: 0,
      },
      () => {
        window.$("#addAssessmentAdministrationModal").modal("show");
      }
    );
  };
  viewAssessmentAdministration = (id) => {
    this.setState({ isView: 1, isEdit: 0 }, () => {
      let executedArgument = new ExecuteArgs(
        commonAssessmentConfig.COMPONENT_ASSESSMENT,
        commonAssessmentConfig.COMPONENT_GET_ASSESSMENT_ADMINISTRATION_BY_ID +
          id,
        commonConfig.METHOD_TYPE_GET
      );
      this.props.onGetBySuccess(executedArgument);
    });
  };
  getAllAdministration = () => {
    this.setState(
      { dataTableFlag: true, getShowAdministrationFlag: true },
      () => {
        let executedArgument = new ExecuteArgs(
          commonAssessmentConfig.COMPONENT_ASSESSMENT,
          commonAssessmentConfig.COMPONENT_GET_ASSESSMENT_ADMINISTRATION_LIST +
            new sessionStore().returnSchoolID(),
          commonConfig.METHOD_TYPE_GET
        );
        this.props.onGetAllSuccess(executedArgument);
      }
    );
  };
  editAdministration = (id) => {
    this.setState(
      { isEdit: 1, isView: 0, isAddAdministrationFlag: false },
      () => {
        let executedArgument = new ExecuteArgs(
          commonAssessmentConfig.COMPONENT_ASSESSMENT,
          commonAssessmentConfig.COMPONENT_GET_ASSESSMENT_ADMINISTRATION_BY_ID +
            id,
          commonConfig.METHOD_TYPE_GET
        );
        this.props.onGetBySuccess(executedArgument);
      }
    );
  };
  handleDelete = (deleteId, success = false) => {
    this.setState({ deleteId, deleteFlag: true }, () => {
      window.$(document).on("click", "#yesBtn", function () {
        dataTableObj.returnDestroyTable();
      });
    });
  };
  handleChange = (event) => {
    let fields = Object.assign({}, this.state.fields);
    let integerField = this.state.integerFields;
    if (integerField.indexOf(event.target.name) === -1) {
      fields[event.target.name] = event.target.value;
    } else {
      if (isNaN(parseInt(event.target.value, 10))) {
        fields[event.target.name] = null;
      } else {
        fields[event.target.name] = parseInt(event.target.value, 10);
      }
    }
    this.setState({ fields: fields });
  };
  reasonChange = (event) => {
    let fields = Object.assign({}, this.state.fields);
    fields[event.target.name] = event.target.value;
    this.setState({ fields: fields });
  };
  handleChangePublish = (event) => {
    let fields = Object.assign({}, this.state.fields);
    fields[event.target.name] = parseInt(event.target.value, 10);
    this.setState({ fields: fields }, () => {
      if (
        this.state.fields.lookupPublicationStatus === this.state.valStatus ||
        ((fields["publishComments"] === null ||
          fields["publishComments"] === "") &&
          fields["lookupPublicationStatus"] !== commonConfig.PUBLISHED_VALUE) ||
        (this.state.fields.lookupPublicationStatus !==
          commonConfig.PUBLISHED_VALUE &&
          this.state.valStatus !== commonConfig.PUBLISHED_VALUE)
      ) {
        this.setState({ isReason: false });
      } else {
        fields["comment"] = "";
        this.setState({ isReason: true, fields: fields });
      }
    });
  };
  handleChangeTime = (name) => (event) => {
    let fields = Object.assign({}, this.state.fields);
    var hours = event.target.value.substring(0, 2);
    var minutes = event.target.value.substring(3, 5);
    hours = hours % 12;
    hours = hours ? hours : 12;
    var tempTime = hours + ":" + minutes;
    fields[event.target.name] = event.target.value;
    if (event.target.name === "startTime")
      this.setState({ tempStartTime: tempTime });
    if (event.target.name === "endTime")
      this.setState({ tempEndTime: tempTime });
    this.setState({ fields: fields });
  };
  closeModal = () => {
    this.setState(
      {
        isError: 0,
        isEdit: 0,
        tempStartTime: "",
        tempEndTime: "",
        selectedOption: [],
        fields: this.initializeFields,
      },
      () => {
        window.$("#addAssessmentAdministration").trigger("reset");
      }
    );
  };
  handleSubmit = (checkAddFlag, e) => {
    e.preventDefault();
    let validationObj = new Validation();
    let submitStatus = null;
    if (this.state.isReason) {
      submitStatus = validationObj.fieldValidation(
        this.state.fields,
        this.state.initialRequiredFields
      );
    } else {
      submitStatus = validationObj.fieldValidation(
        this.state.fields,
        this.state.requiredFields
      );
    }
    if (submitStatus === 0) {
      this.setState({ isError: 1 }, () => {
        window.$("#addAssessmentAdministrationModal").modal("show");
      });
    } else {
      let fields = Object.assign({}, this.state.fields);
      fields.startTime =
        this.state.tempStartTime !== ""
          ? commonFuncObj.get24hTime(
              timeZoneObj.returnUtcTime(fields.startTime)
            )
          : "";
      fields.endTime =
        this.state.tempEndTime !== ""
          ? commonFuncObj.get24hTime(timeZoneObj.returnUtcTime(fields.endTime))
          : "";
      if (checkAddFlag) {
        this.setState({ isError: 0, getSaveAdministrationFlag: true }, () => {
          let executedArgument = new ExecuteArgs(
            commonAssessmentConfig.COMPONENT_ASSESSMENT,
            commonAssessmentConfig.COMPONENT_SAVE_ASSESSMENT_ADMINISTRATION,
            commonConfig.METHOD_TYPE_POST,
            fields
          );
          this.props.onSaveSuccess(executedArgument);
        });
      } else {
        this.setState(
          { isError: 0, isEdit: 0, getSaveAdministrationFlag: true },
          () => {
            let executedArgument = new ExecuteArgs(
              commonAssessmentConfig.COMPONENT_ASSESSMENT,
              commonAssessmentConfig.COMPONENT_UPDATE_ASSESSMENT_ADMINISTRATION,
              commonConfig.METHOD_TYPE_POST,
              fields
            );
            this.props.onSaveSuccess(executedArgument);
          }
        );
      }
    }
  };
  componentWillUnmount() {
    this.props.onResetProps({ name: "assessmentAdministrationList", data: [] });
    this.props.onResetProps({
      name: "lookupAssessmentReportingMethodList",
      data: [],
    });
    this.props.onResetProps({ name: "saveAssessmentAdministration", data: {} });
  }
  componentWillReceiveProps(nextProps) {
    if (
      !isEqual(
        nextProps.assessmentAdministrationList,
        this.props.assessmentAdministrationList
      )
    ) {
      this.setState(
        { getShowAdministrationFlag: true, dataTableFlag: true },
        () => {
          dataTableObj.returnDestroyTable();
        }
      );
    }
    if (
      nextProps.assessmentAdministrationList &&
      nextProps.assessmentAdministrationList.length !== 0 &&
      this.state.getShowAdministrationFlag &&
      this.state.dataTableFlag
    ) {
      if (
        this.props.lookupAssessmentReportingMethodList &&
        this.props.lookupAssessmentReportingMethodList.length === 0
      ) {
        this.props.onGetLookup(commonConfig.LOOKUP_PUBLICATION_STATUS);
      }
      this.setState(
        {
          getShowAdministrationFlag: false,
          dataTableFlag: false,
          assessmentAdministrationList: nextProps.assessmentAdministrationList,
        },
        () => {
          dataTableObj.returnDestroyTable();
          dataTableObj.returnResetTable();
        }
      );
    }
    if (
      nextProps.assessmentAdministrationList &&
      nextProps.assessmentAdministrationList.length === 0
    ) {
      this.setState({ assessmentAdministrationList: [] });
    }
    if (
      nextProps.saveAssessmentAdministration &&
      Object.keys(nextProps.saveAssessmentAdministration).length > 0 &&
      this.state.getSaveAdministrationFlag
    ) {
      this.getAllAdministration();
      this.setState(
        {
          fields: { ...this.initializeFields },
          selectedOption: [],
          tempStartTime: "",
          tempEndTime: "",
          getSaveAdministrationFlag: false,
        },
        () => {
          window.$("#addAssessmentAdministration").trigger("reset");
          window.$("#addAssessmentAdministrationModal").modal("hide");
          dataTableObj.returnDestroyTable();
          this.getAllAdministration();
        }
      );
    }
    if (
      nextProps.saveAssessmentAdministration === null &&
      this.state.getSaveAdministrationFlag
    ) {
      let fields = this.state.fields;
      fields.startTime =
        nextProps.getAssessmentAdministration.startTime !== null
          ? this.state.tempStartTime
          : "";
      fields.endTime =
        nextProps.getAssessmentAdministration.endTime !== null
          ? this.state.tempEndTime
          : "";
      fields.startTime = fields.startTime.substring(0, 8);
      fields.endTime = fields.endTime.substring(0, 8);
      this.setState({ fields: fields });
    }
    if (
      nextProps.getAssessmentAdministration &&
      Object.keys(nextProps.getAssessmentAdministration).length > 0
    ) {
      let fields = nextProps.getAssessmentAdministration;
      if (!!fields.publishComments) {
        fields.publishComments = fields.publishComments.replace("|", "\n");
        this.setState({ isComment: true });
      } else {
        this.setState({ isComment: false });
      }
      if (this.state.isEdit === 1) {
        fields.lookupPublicationStatus =
          nextProps.getAssessmentAdministration.lookupPublicationStatus !== null
            ? nextProps.getAssessmentAdministration.lookupPublicationStatus
            : "";
        fields["startDate"] =
          nextProps.getAssessmentAdministration.startDate !== null
            ? nextProps.getAssessmentAdministration.startDate.slice(0, 10)
            : "";
        fields["endDate"] =
          nextProps.getAssessmentAdministration.endDate !== null
            ? nextProps.getAssessmentAdministration.endDate.slice(0, 10)
            : "";
        fields["startTime"] =
          nextProps.getAssessmentAdministration.startTime !== null &&
          nextProps.getAssessmentAdministration.startTime !==
            commonConfig.DFAULT_TIME
            ? moment(nextProps.getAssessmentAdministration.startTime).format(
                "HH:mm"
              )
            : "";
        fields["endTime"] =
          nextProps.getAssessmentAdministration.endTime !== null &&
          nextProps.getAssessmentAdministration.endTime !==
            commonConfig.DFAULT_TIME
            ? moment(nextProps.getAssessmentAdministration.endTime).format(
                "HH:mm"
              )
            : "";
        let tempStartTime =
          nextProps.getAssessmentAdministration.startTime !== null &&
          nextProps.getAssessmentAdministration.startTime !== ""
            ? commonFuncObj
                .get24hTime(nextProps.getAssessmentAdministration.startTime)
                .substr(0, 5)
            : "";
        let tempEndTime =
          nextProps.getAssessmentAdministration.endTime !== null &&
          nextProps.getAssessmentAdministration.endTime !== ""
            ? commonFuncObj
                .get24hTime(nextProps.getAssessmentAdministration.endTime)
                .substr(0, 5)
            : "";
        this.setState({ fields, tempStartTime, tempEndTime });
        let selectedOptionArray = [];
        let selectedTitle = [];
        let selectedTitleArray =
          nextProps.getAssessmentAdministration.periodIds !== null
            ? nextProps.getAssessmentAdministration.periodIds.split(",")
            : [];
        selectedTitle =
          nextProps.getAssessmentAdministration.periods !== null
            ? nextProps.getAssessmentAdministration.periods.split(",")
            : [];
        selectedTitleArray.forEach((data, index) => {
          var element = {};
          element.value = parseInt(data, 10);
          element.label = selectedTitle[index];
          selectedOptionArray.push(element);
        });
        this.setState(
          {
            selectedOption: selectedOptionArray,
            isEdit: 0,
            isReason: false,
            valStatus:
              nextProps.getAssessmentAdministration.lookupPublicationStatus,
          },
          () => {
            window.$("#addAssessmentAdministrationModal").modal("show");
          }
        );
      }
      if (this.state.isView) {
        let badgeColor = "";
        if (
          nextProps.getAssessmentAdministration.lookupPublicationStatus ===
            9501 ||
          nextProps.getAssessmentAdministration.lookupPublicationStatus === 9503
        )
          badgeColor = "badge badge-success text-uppercase m-l-15 mt-1";
        else if (
          nextProps.getAssessmentAdministration.lookupPublicationStatus === 9502
        )
          badgeColor = "badge badge-secondary text-uppercase m-l-15 mt-1";
        else if (
          nextProps.getAssessmentAdministration.lookupPublicationStatus === 9504
        )
          badgeColor = "badge badge-danger text-uppercase m-l-15 mt-1";
        else badgeColor = "badge badge-warning text-uppercase m-l-15 mt-1";
        this.setState({ isView: 0, badgeColor }, () => {
          window.$("#titleSchoolSessionModal").modal("show");
        });
      }
    }
    if (this.state.deleteId && this.state.deleteFlag) {
      this.setState(
        {
          getShowAdministrationFlag: true,
          dataTableFlag: true,
          deleteFlag: false,
        },
        () => {
          dataTableObj.returnDestroyTable();
          this.getAllAdministration();
        }
      );
    }
  }
  render() {
    const publicStatusList = !!this.props.lookupPublicationStatusList
      ? uniqBy(this.props.lookupPublicationStatusList, "lookupCode")
      : [];
    return !!new sessionStore().returnSessionCurrentPagePermission() &&
      new sessionStore().returnSessionCurrentPagePermission().viewPermission ? (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-12">
            {!!new sessionStore().returnSessionCurrentPagePermission() &&
              new sessionStore().returnSessionCurrentPagePermission()
                .editPermission && (
                <Link
                  className="btn btn-success float-sm-right m-b-15"
                  to=""
                  data-toggle="modal"
                  onClick={() => this.addAssesmentAdministration()}
                >
                  <i className="icon-plus3 m-r-10"></i>
                  {i18n.t("addAssessmentAdministration")}
                </Link>
              )}
          </div>
        </div>
        <div className="card">
          <div
            className="card-body p-0"
            data-testing="assessment-assessmentAdministration-tableView-section"
          >
            {dataTableObj.returnTable(
              tableColumns,
              this.state.assessmentAdministrationList,
              this,
              !!new sessionStore().returnSessionCurrentPagePermission() &&
                new sessionStore().returnSessionCurrentPagePermission()
                  .editPermission
                ? editFunc
                : "",
              !!new sessionStore().returnSessionCurrentPagePermission() &&
                new sessionStore().returnSessionCurrentPagePermission()
                  .deletePermission
                ? deleteFunc
                : "",
              dateFlag,
              viewFunc
            )}
          </div>
        </div>
        <form
          action=""
          id="addAssessmentAdministration"
          name="addAssessmentAdministration"
        >
          <div className="modal fade" id="addAssessmentAdministrationModal">
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {this.state.isEdit === 1
                      ? i18n.t("editAssessmentAdministration")
                      : i18n.t("addAssessmentAdministration")}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => this.closeModal()}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div
                  className="modal-body pb-0"
                  data-testing="assessment-assessmentAdministration-addEdit-section"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <MarkersCommonSelect
                        label={i18n.t("assessment")}
                        name="assessmentId"
                        value={this.state.fields.assessmentId || ""}
                        optArray={this.props.assessmentList}
                        handleChange={this.handleChange}
                        isError={this.state.isError}
                        isRequired={true}
                        disabled={
                          this.props.getAssessmentAdministration
                            .lookupPublicationStatus ===
                          commonConfig.PUBLISHED_PUBLICATION_STATUS
                            ? true
                            : false
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="col-form-label">
                          {i18n.t("title")} <span>*</span>
                        </label>
                        <input
                          type="text"
                          maxLength={256}
                          className="form-control"
                          placeholder={i18n.t("enterTitle")}
                          name="title"
                          value={this.state.fields.title || ""}
                          onChange={this.handleChange}
                          disabled={
                            this.props.getAssessmentAdministration
                              .lookupPublicationStatus ===
                            commonConfig.PUBLISHED_PUBLICATION_STATUS
                              ? true
                              : false
                          }
                        />
                        <Validation
                          data={{
                            field: i18n.t("title"),
                            errorClass: "title_error",
                            value: this.state.fields.title,
                            isError: this.state.isError,
                            validationType: "regExp",
                            regExp: commonConfig.FUNDING_PROGRAM,
                          }}
                          returnValidation={this.functionValidation}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="col-form-label">
                          {i18n.t("code")} <span>*</span>
                        </label>
                        <input
                          type="text"
                          maxLength={40}
                          className="form-control"
                          placeholder={i18n.t("enterCode")}
                          name="code"
                          onChange={this.handleChange}
                          value={this.state.fields.code || ""}
                          disabled={
                            this.props.getAssessmentAdministration
                              .lookupPublicationStatus ===
                            commonConfig.PUBLISHED_PUBLICATION_STATUS
                              ? true
                              : false
                          }
                        />
                        <Validation
                          data={{
                            field: i18n.t("code"),
                            errorClass: "code_error",
                            value: this.state.fields.code,
                            isError: this.state.isError,
                            validationType: "regExp",
                            regExp: commonConfig.ASSESSMENT_CODE,
                          }}
                          returnValidation={this.functionValidation}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <MarkersCommonSelect
                        label={i18n.t("assessmentReportingMethod")}
                        name="lookupAssessmentReportingMethod"
                        value={
                          this.state.fields.lookupAssessmentReportingMethod ||
                          ""
                        }
                        optArray={
                          this.props.lookupAssessmentReportingMethodList
                        }
                        handleChange={this.handleChange}
                        isError={this.state.isError}
                        isRequired={true}
                        disabled={
                          this.props.getAssessmentAdministration
                            .lookupPublicationStatus ===
                          commonConfig.PUBLISHED_PUBLICATION_STATUS
                            ? true
                            : false
                        }
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-12">
                          <MarkersDatepicker
                            title={i18n.t("startDate")}
                            name="startDate"
                            value={this.state.fields.startDate}
                            onChange={this.handleChange}
                            isRequired={true}
                            isError={this.state.isError}
                          />
                        </div>
                        <div className="col-md-12">
                          <MarkersDatepicker
                            title={i18n.t("endDate")}
                            name="endDate"
                            value={this.state.fields.endDate}
                            onChange={this.handleChange}
                            isRequired={true}
                            isError={this.state.isError}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-12">
                          <Timepicker
                            title={i18n.t("startTime")}
                            value={this.state.fields.startTime}
                            onChange={this.handleChangeTime("startTime")}
                            name="startTime"
                            disabled={
                              this.props.getAssessmentAdministration
                                .lookupPublicationStatus ===
                              commonConfig.PUBLISHED_PUBLICATION_STATUS
                                ? true
                                : false
                            }
                            id="startTime"
                            placeholder="Select Time"
                            divClassName="form-control"
                          />
                        </div>
                        <div className="col-md-12">
                          <Timepicker
                            title={i18n.t("endTime")}
                            onChange={this.handleChangeTime("endTime")}
                            name="endTime"
                            value={this.state.fields.endTime}
                            disabled={
                              this.props.getAssessmentAdministration
                                .lookupPublicationStatus ===
                              commonConfig.PUBLISHED_PUBLICATION_STATUS
                                ? true
                                : false
                            }
                            id="endTime"
                            placeholder="Select Time"
                            divClassName="form-control"
                            startTime={this.state.fields.startTime}
                            endTime={this.state.fields.endTime}
                            isError={this.state.isError}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <MarkersCommonSelect
                        label={i18n.t("period")}
                        name="periodIds"
                        value={this.state.fields.periodIds || ""}
                        optArray={this.props.schoolPeriodList}
                        multi={true}
                        handleChange={this.handleChange}
                        isError={this.state.isError}
                        isRequired={true}
                        disabled={
                          this.props.getAssessmentAdministration
                            .lookupPublicationStatus ===
                          commonConfig.PUBLISHED_PUBLICATION_STATUS
                            ? true
                            : false
                        }
                      />
                      <MarkersCommonSelect
                        label={i18n.t("publicationStatus")}
                        name="lookupPublicationStatus"
                        value={this.state.fields.lookupPublicationStatus || ""}
                        optArray={publicStatusList}
                        handleChange={this.handleChangePublish}
                        isError={this.state.isError}
                        isRequired={true}
                        disabled={
                          this.state.isAddAdministrationFlag ? true : false
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="col-form-label">
                          {i18n.t("description")}
                        </label>
                        <textarea
                          className="form-control"
                          style={{ height: "122px" }}
                          placeholder={i18n.t("enterDescription")}
                          name="description"
                          onChange={this.handleChange}
                          value={this.state.fields.description || ""}
                          rows="3"
                          disabled={
                            this.props.getAssessmentAdministration
                              .lookupPublicationStatus ===
                            commonConfig.PUBLISHED_PUBLICATION_STATUS
                              ? true
                              : false
                          }
                        ></textarea>
                        <Validation
                          data={{
                            field: i18n.t("description"),
                            errorClass: "description_error",
                            value: this.state.fields.description,
                            isError: this.state.isError,
                            validationType: "regExpNotRequired",
                            regExp: commonConfig.SUBJECT_DESCRIPTION,
                          }}
                          returnValidation={this.functionValidation}
                        />
                      </div>
                    </div>
                    {this.state.isReason && (
                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="col-form-label">
                            {i18n.t("reason")} <span>*</span>
                          </label>
                          <textarea
                            className="form-control"
                            style={{ height: "122px" }}
                            placeholder={i18n.t("enterReason")}
                            name="comment"
                            value={this.state.fields.comment || ""}
                            onChange={this.reasonChange}
                          />
                          <Validation
                            data={{
                              field: i18n.t("reason"),
                              errorClass: "comment_error",
                              value: this.state.fields.comment,
                              isError: this.state.isError,
                              validationType: "field",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  {!!new sessionStore().returnSessionCurrentPagePermission() &&
                    new sessionStore().returnSessionCurrentPagePermission()
                      .editPermission && (
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={(e) =>
                          this.handleSubmit(
                            this.state.isAddAdministrationFlag,
                            e
                          )
                        }
                      >
                        {i18n.t("submit")}
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="modal fade" id="titleSchoolSessionModal">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {this.props.getAssessmentAdministration &&
                  Object.keys(this.props.getAssessmentAdministration).length > 0
                    ? this.props.getAssessmentAdministration.title
                    : null}
                </h5>{" "}
                {this.props.getAssessmentAdministration &&
                Object.keys(this.props.getAssessmentAdministration).length >
                  0 ? (
                  <label className={this.state.badgeColor}>
                    {
                      this.props.getAssessmentAdministration
                        .lookupPublicationStatusTitle
                    }
                  </label>
                ) : null}
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body pb-0">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        {i18n.t("assessment")}
                      </label>
                      <p>
                        {this.props.getAssessmentAdministration &&
                        Object.keys(this.props.getAssessmentAdministration)
                          .length > 0
                          ? this.props.getAssessmentAdministration
                              .assessmentTitle
                          : commonConfig.DASH_VALUE}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        {i18n.t("title")}
                      </label>
                      <p>
                        {this.props.getAssessmentAdministration &&
                        Object.keys(this.props.getAssessmentAdministration)
                          .length > 0
                          ? this.props.getAssessmentAdministration.title
                          : commonConfig.DASH_VALUE}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">{i18n.t("code")}</label>
                      <p>
                        {this.props.getAssessmentAdministration &&
                        Object.keys(this.props.getAssessmentAdministration)
                          .length > 0
                          ? this.props.getAssessmentAdministration.code
                          : commonConfig.DASH_VALUE}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        {i18n.t("assessmentReportingMethod")}
                      </label>
                      <p>
                        {this.props.getAssessmentAdministration &&
                        Object.keys(this.props.getAssessmentAdministration)
                          .length > 0
                          ? this.props.getAssessmentAdministration
                              .lookupAssessmentReportingMethodTitle
                          : commonConfig.DASH_VALUE}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="col-form-label">
                            {i18n.t("startDate")}
                          </label>
                          <p>
                            {this.props.getAssessmentAdministration &&
                            Object.keys(this.props.getAssessmentAdministration)
                              .length > 0 ? (
                              <ConvertDate
                                calDate={
                                  this.props.getAssessmentAdministration
                                    .startDate
                                }
                              />
                            ) : (
                              commonConfig.DASH_VALUE
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="col-form-label">
                            {i18n.t("endDate")}
                          </label>
                          <p>
                            {this.props.getAssessmentAdministration &&
                            Object.keys(this.props.getAssessmentAdministration)
                              .length > 0 ? (
                              <ConvertDate
                                calDate={
                                  this.props.getAssessmentAdministration.endDate
                                }
                              />
                            ) : (
                              commonConfig.DASH_VALUE
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="col-form-label">
                            {i18n.t("startTime")}
                          </label>
                          <p>
                            {this.props.getAssessmentAdministration &&
                            Object.keys(this.props.getAssessmentAdministration)
                              .length > 0
                              ? this.props.getAssessmentAdministration
                                  .startTime !== commonConfig.DFAULT_TIME
                                ? timeZoneObj.returnTime(
                                    this.props.getAssessmentAdministration
                                      .startTime
                                  )
                                : commonConfig.DASH_VALUE
                              : commonConfig.DASH_VALUE}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="col-form-label">
                            {i18n.t("endTime")}
                          </label>
                          <p>
                            {this.props.getAssessmentAdministration &&
                            Object.keys(this.props.getAssessmentAdministration)
                              .length > 0
                              ? this.props.getAssessmentAdministration
                                  .endTime !== commonConfig.DFAULT_TIME
                                ? timeZoneObj.returnTime(
                                    this.props.getAssessmentAdministration
                                      .endTime
                                  )
                                : commonConfig.DASH_VALUE
                              : commonConfig.DASH_VALUE}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        {i18n.t("period")}
                      </label>
                      <p>
                        {this.props.getAssessmentAdministration &&
                        Object.keys(this.props.getAssessmentAdministration)
                          .length > 0
                          ? this.props.getAssessmentAdministration.periods
                          : commonConfig.DASH_VALUE}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        {i18n.t("description")}
                      </label>
                      <p>
                        {this.props.getAssessmentAdministration.description !==
                          null &&
                        this.props.getAssessmentAdministration.description !==
                          ""
                          ? this.props.getAssessmentAdministration.description
                          : commonConfig.DASH_VALUE}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MarkersDelete
          deleteId={this.state.deleteId}
          componentName={commonAssessmentConfig.COMPONENT_ASSESSMENT}
          endPoint={
            commonAssessmentConfig.COMPONENT_DELETE_ASSESSMENT_ADMINISTRATION
          }
          setDeleteSuccess={this.handleDelete}
        />
      </React.Fragment>
    ) : (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body f-s-13 text-danger text-center">
              <i className="icon-info2 m-r-5"></i> {i18n.t("noViewPermission")}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    assessmentAdministrationList:
      state.assessmentStore.assessmentAdministrationList,
    saveAssessmentAdministration:
      state.assessmentStore.saveAssessmentAdministration,
    getAssessmentAdministration:
      state.assessmentStore.getAssessmentAdministration,
    schoolPeriodList: state.schoolStore.schoolPeriodList,
    assessmentList: state.assessmentStore.assessmentList,
    lookupPublicationStatusList: state.commonStore.lookupPublicationStatusList,
    lookupAssessmentReportingMethodList:
      state.commonStore.lookupAssessmentReportingMethodList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetAllSuccess: (executeArgs) =>
      dispatch(actions.callAssessmentListApi(executeArgs, "administration")),
    onSaveSuccess: (executeArgs) =>
      dispatch(actions.callAssessmentSaveApi(executeArgs, "administration")),
    onGetBySuccess: (executeArgs) =>
      dispatch(actions.callAssessmentGetByApi(executeArgs, "administration")),
    onGetLookup: (categoryType) =>
      dispatch(actionsCommon.callLookupApi(categoryType)),
    onGetPeriodAllSuccess: (executeArgs) =>
      dispatch(actionsSchool.callSchoolListApi(executeArgs, "Period")),
    onGetAllAssessmentInfoSuccess: (executeArgs) =>
      dispatch(actions.callAssessmentListApi(executeArgs, "")),
    onResetProps: (executeArgs) =>
      dispatch(actions.assessmentStoreStateReset(executeArgs)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssessmentAdministrationComponent);
