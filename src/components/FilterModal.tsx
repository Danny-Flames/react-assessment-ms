import React, { useState } from "react";
import { IoClose, IoChevronDown, IoChevronUp } from "react-icons/io5";
import DatePicker from "react-datepicker";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  closeFilter,
  setQuickFilter,
  setDateRange,
  toggleTransactionType,
  clearFilters,
  QuickFilterType,
  TransactionType,
} from "../store/slices/filterSlice";
import {
  QUICK_FILTERS,
  TRANSACTION_STATUS_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "../types";

const FilterModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen, quickFilter, dateRange, transactionTypes } = useAppSelector(
    (state) => state.filter
  );

  const [startDate, setStartDate] = useState<Date | null>(
    dateRange.start ? new Date(dateRange.start) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    dateRange.end ? new Date(dateRange.end) : null
  );
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [showTransactionTypeDropdown, setShowTransactionTypeDropdown] =
    useState(false);
  const [showTransactionStatusDropdown, setShowTransactionStatusDropdown] =
    useState(false);
  const [transactionStatuses, setTransactionStatuses] = useState<string[]>([
    "successful",
    "pending",
    "failed",
  ]);

  const handleQuickFilterChange = (value: QuickFilterType) => {
    dispatch(setQuickFilter(value));
  };

  const handleTransactionTypeToggle = (type: TransactionType) => {
    dispatch(toggleTransactionType(type));
  };

  const handleTransactionStatusToggle = (status: string) => {
    setTransactionStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleApply = () => {
    if (startDate && endDate) {
      dispatch(
        setDateRange({
          start: startDate.toISOString(),
          end: endDate.toISOString(),
        })
      );
    }
    dispatch(closeFilter());
  };

  const handleClear = () => {
    dispatch(clearFilters());
    setStartDate(null);
    setEndDate(null);
    setTransactionStatuses([]);
  };

  const formatDateForInput = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getSelectedTransactionTypeLabel = () => {
    if (transactionTypes.length === 0) return "Select type";
    if (transactionTypes.length === 1) {
      return (
        TRANSACTION_TYPE_OPTIONS.find(
          (opt) => opt.value === transactionTypes[0]
        )?.label || ""
      );
    }
    if (transactionTypes.length === TRANSACTION_TYPE_OPTIONS.length) {
      return TRANSACTION_TYPE_OPTIONS.map((opt) => opt.label).join(", ");
    }
    return transactionTypes
      .map(
        (type) =>
          TRANSACTION_TYPE_OPTIONS.find((opt) => opt.value === type)?.label
      )
      .join(", ");
  };

  const getSelectedTransactionStatusLabel = () => {
    if (transactionStatuses.length === 0) return "Select status";
    if (transactionStatuses.length === 1) {
      return (
        TRANSACTION_STATUS_OPTIONS.find(
          (opt) => opt.value === transactionStatuses[0]
        )?.label || ""
      );
    }
    if (transactionStatuses.length === TRANSACTION_STATUS_OPTIONS.length) {
      return "Successful, Pending, Failed";
    }
    return transactionStatuses
      .map(
        (s) => TRANSACTION_STATUS_OPTIONS.find((opt) => opt.value === s)?.label
      )
      .join(", ");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-[1000ms] ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => dispatch(closeFilter())}
      />

      {/* Modal */}
      <div
        className={`fixed top-0 sm:top-4 right-0 sm:right-4 bottom-0 sm:bottom-4 w-full sm:w-[90vw] md:w-[70vw] lg:w-[50vw] xl:w-[33vw] bg-white shadow-2xl z-50 flex flex-col rounded-none sm:rounded-3xl transition-all duration-[1000ms] ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-[110%]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-[#131316]">
            Filter
          </h2>
          <button
            onClick={() => dispatch(closeFilter())}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <IoClose className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Quick Filters */}
          <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-2">
            {QUICK_FILTERS.map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleQuickFilterChange(filter.value)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  quickFilter === filter.value
                    ? "bg-black text-white"
                    : " text-[#131316] hover:bg-[#EFF1F6] border border-[#EFF1F6]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-[#131316] mb-3">
              Date Range
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Start Date */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowStartCalendar(!showStartCalendar);
                    setShowEndCalendar(false);
                    setShowTransactionTypeDropdown(false);
                    setShowTransactionStatusDropdown(false);
                  }}
                  className="w-full px-4 py-3 sm:py-4 bg-[#EFF1F6] border border-gray-200 rounded-xl text-left text-sm text-[#131316] hover:bg-gray-100 transition-colors flex items-center justify-between"
                >
                  <span>{formatDateForInput(startDate) || "17 Jul 2023"}</span>
                  <IoChevronDown className="w-4 h-4 text-gray-600" />
                </button>
                {showStartCalendar && (
                  <div className="absolute top-full left-0 mt-2 z-10 bg-white rounded-lg shadow-xl border border-gray-200">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                        setShowStartCalendar(false);
                      }}
                      inline
                      maxDate={endDate || new Date()}
                    />
                  </div>
                )}
              </div>

              {/* End Date */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowEndCalendar(!showEndCalendar);
                    setShowStartCalendar(false);
                    setShowTransactionTypeDropdown(false);
                    setShowTransactionStatusDropdown(false);
                  }}
                  className="w-full px-4 py-3 sm:py-4 bg-[#EFF1F6] border border-gray-200 rounded-xl text-left text-sm text-[#131316] hover:bg-gray-100 transition-colors flex items-center justify-between"
                >
                  <span>{formatDateForInput(endDate) || "17 Aug 2023"}</span>
                  <IoChevronDown className="w-4 h-4 text-gray-600" />
                </button>
                {showEndCalendar && (
                  <div className="absolute top-full right-0 mt-2 z-10 bg-white rounded-lg shadow-xl border border-gray-200">
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => {
                        setEndDate(date);
                        setShowEndCalendar(false);
                      }}
                      inline
                      minDate={startDate || undefined}
                      maxDate={new Date()}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium text-[#131316] mb-3">
              Transaction Type
            </label>
            <div className="relative">
              <button
                onClick={() => {
                  setShowTransactionTypeDropdown(!showTransactionTypeDropdown);
                  setShowTransactionStatusDropdown(false);
                  setShowStartCalendar(false);
                  setShowEndCalendar(false);
                }}
                className={`w-full px-4 py-3 sm:py-4 bg-[#EFF1F6] rounded-xl text-left text-sm text-[#131316] hover:bg-gray-100 transition-colors flex items-center justify-between ${
                  showTransactionTypeDropdown
                    ? "border-[2px] border-black"
                    : "border border-gray-200"
                }`}
              >
                <span className="truncate pr-2">
                  {getSelectedTransactionTypeLabel()}
                </span>
                {showTransactionTypeDropdown ? (
                  <IoChevronUp className="w-4 h-4 text-gray-600 flex-shrink-0" />
                ) : (
                  <IoChevronDown className="w-4 h-4 text-gray-600 flex-shrink-0" />
                )}
              </button>

              {showTransactionTypeDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 z-10 bg-white rounded-xl shadow-xl border border-gray-200 py-2">
                  {TRANSACTION_TYPE_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={transactionTypes.includes(
                          option.value as TransactionType
                        )}
                        onChange={() =>
                          handleTransactionTypeToggle(
                            option.value as TransactionType
                          )
                        }
                        className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black focus:ring-offset-0"
                        style={{ accentColor: "black" }}
                      />
                      <span className="text-sm text-[#131316]">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Transaction Status */}
          <div>
            <label className="block text-sm font-medium text-[#131316] mb-3">
              Transaction Status
            </label>
            <div className="relative">
              <button
                onClick={() => {
                  setShowTransactionStatusDropdown(
                    !showTransactionStatusDropdown
                  );
                  setShowTransactionTypeDropdown(false);
                  setShowStartCalendar(false);
                  setShowEndCalendar(false);
                }}
                className={`w-full px-4 py-3 sm:py-4 bg-[#EFF1F6] rounded-xl text-left text-sm text-[#131316] hover:bg-gray-100 transition-colors flex items-center justify-between ${
                  showTransactionStatusDropdown
                    ? "border-[2px] border-black"
                    : "border border-gray-200"
                }`}
              >
                <span className="truncate pr-2">
                  {getSelectedTransactionStatusLabel()}
                </span>
                {showTransactionStatusDropdown ? (
                  <IoChevronUp className="w-4 h-4 text-gray-600 flex-shrink-0" />
                ) : (
                  <IoChevronDown className="w-4 h-4 text-gray-600 flex-shrink-0" />
                )}
              </button>

              {showTransactionStatusDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 z-10 bg-white rounded-xl shadow-xl border border-gray-200 py-2">
                  {TRANSACTION_STATUS_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={transactionStatuses.includes(option.value)}
                        onChange={() =>
                          handleTransactionStatusToggle(option.value)
                        }
                        className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black focus:ring-offset-0"
                        style={{ accentColor: "black" }}
                      />
                      <span className="text-sm text-[#131316]">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-200 flex items-center gap-3">
          <button
            onClick={handleClear}
            className="flex-1 px-4 py-3 sm:py-4 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-[#131316] transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-3 sm:py-4 bg-black hover:bg-gray-800 rounded-full text-sm font-medium text-white transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
